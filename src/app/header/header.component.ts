import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  LoggedIn = false;

  private UserSub : Subscription;

  constructor( private authService : AuthService) { }

  ngOnInit(): void {
    this.UserSub = this.authService.user.subscribe(
      user => {
        this.LoggedIn = user? true : false;
      }
    );
  }
  ngOnDestroy(){
    this.UserSub.unsubscribe();
  }
  onLogOut(){
    this.authService.logout();
  }

}
