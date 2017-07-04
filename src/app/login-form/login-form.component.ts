import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    email: '',
    password: ''
  };

  loginError = ''

  @Output() onFormResult = new EventEmitter<any>();
  constructor(public authService:AuthService,
              private router:Router) { }

  ngOnInit() {}

  onSignInSubmit(){

    this.authService.logInUser(this.signInUser).subscribe(

        res => {
          if(res.status == 200){
            this.onFormResult.emit({signedIn: true, res});
            this.router.navigate(['tasks'])
          }
        },

        err => {
          var data = err.json();
          
          this.loginError = data.errors
          console.log(data.errors)
        }
    )

  }

}