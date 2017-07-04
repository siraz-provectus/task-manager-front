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
        <div class='col s4 collection new' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div class="collection-item task-item" *ngFor='let user of users'>
            <span class="new badge">{{user.email}}</span>
          </div>
        </div>
        <div class='col s4 collection in-process' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div class="collection-item task-item" *ngFor='let user of users'>
            <span class="new badge blue">{{user.email}}</span>
          </div>
        </div>
        <div class='col s4 collection resolved' [dragula]='"another-bag"' [dragulaModel]='many'>
          <div class="collection-item task-item" *ngFor='let user of users'>
            <span class="new badge red">{{user.email}}</span>
          </div>
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