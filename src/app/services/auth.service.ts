import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import { Response, Headers } from "@angular/http";

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:Angular2TokenService) {

    this.authService.validateToken().subscribe(
        res => {
          res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
          }
    )
  }

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );

  }

  userSigned(){
    return this.authService.userSignedIn()
  }

  authHeaders() {
    return this.getHeaders()
  }

  private getHeaders() {
    var headers = new Headers();
    var token = localStorage.getItem('accessToken');
    var client = localStorage.getItem('client');
    var expiry = localStorage.getItem('expiry');
    var tokenType = localStorage.getItem('tokenType');
    var uid = localStorage.getItem('uid');

    headers.append('access-token', token);
    headers.append('client', client);
    headers.append('expiry', expiry);
    headers.append('token-type', tokenType);
    headers.append('uid', uid);

    return headers;
  }

}