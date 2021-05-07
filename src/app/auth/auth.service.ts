import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind : string;
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered? : boolean;
}
@Injectable({
  providedIn:'root'
})


export class AuthService {


  constructor(private http: HttpClient, private router:Router){}

  user = new BehaviorSubject<User>(null);



  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPzPeed8nUf3RQ6uY27IzvvfG9TLlaxF0',
      {
        email: email,
        password: password,
        returnSecureToke: true
      }
    ).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn,);
      })
    );

  }




  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  autologout(expirationDuration:number){
    setTimeout(()=> {
      this.logout();
    },expirationDuration);
  }

  autologin(){
    const userData:{
      email:string;
      id : string;
      _token:string;
      tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData)
    {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData.tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);

    }
  }

  public handleAuthentication(email:string, userId:string, token :string ,  expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    console.log(email,userId,expiresIn,expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse){
    let errorMessage = 'An Unknown Error Occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Entered email not found';

      case 'INVALID_PASSWORD':
        errorMessage = "Entered the incorrect password"
    }
    return throwError(errorMessage);
  }
}
