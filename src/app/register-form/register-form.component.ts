import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  errors = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthSerivce:Angular2TokenService,
              private router:Router) { }

  ngOnInit() {}


  onSignUpSubmit(){

    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe(

        (res) => {

          if (res.status == 200){
            this.onFormResult.emit({signedUp: true, res})
            this.router.navigate(['tasks'])
          }

        },

        (err) => {
          console.log(err.json())
          var data = err.json();
 
          this.errors.email = data.errors.email
          this.errors.password = data.errors.password
          this.errors.passwordConfirmation = data.errors.passwordConfirmation
        }
    )

  }
}