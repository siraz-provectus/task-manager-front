import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';
  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);
  }
}
