import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { Angular2TokenService} from "angular2-token";

@Component({
    selector: 'user-list',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public tokenAuthService:Angular2TokenService,
              public authService:AuthService,
              private router:Router) {}

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  ngOnInit() {
    if(this.authService.userSigned()) {
      this.router.navigate(['users'])
    } else {
      this.router.navigate(['/'])
    }
  }

}
