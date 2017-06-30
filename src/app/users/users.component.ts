import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  providers: [UserService],
  viewProviders: [DragulaService],
  selector: 'sample',
  template:`
    <div class='row'>
      <div class='row'>
        <div class='col s4' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div *ngFor='let user of users' [innerHtml]="user.email"></div>
        </div>
        <div class='col s4' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div *ngFor='let user of users' [innerHtml]="user.email"></div>
        </div>
        <div class='col s4' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div *ngFor='let user of users' [innerHtml]="user.email"></div>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {

  constructor(public authService:AuthService,
              private _userDataService:UserService,
              private router:Router) {
    this.getUsers();
  }

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  private users:User[] = [];
  private errorMessage:any = '';

  getUsers() {
    this._userDataService.getData()
      .subscribe(
          users => {
            this.users = users
          },
          error => this.errorMessage = <any>error);
  }

  ngOnInit() {
  }

}