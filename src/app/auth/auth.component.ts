import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {error} from '@angular/compiler/src/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string = null;

  title = 'Authenticate';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.autologin();
  }

  logIn(loginForm: NgForm) {
    const login = loginForm.value
    const email = login.email;
    const password = login.password;
    this.authService.login(email, password).subscribe(resData => {
      this.router.navigate(['./employee']);
    }, errorMsg => {
      this.error=errorMsg
    });

  }
}
