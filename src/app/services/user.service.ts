import {Injectable} from "@angular/core";
import { environment } from "../../environments/environment";
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";
import { User } from "../models/user";

@Injectable()
export class UserService {
  constructor(private http:Http,
              private authService:AuthService) {
  }

  getData():Observable<User[]> {
      return this.http.get(environment.baseUrl + '/users.json', { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }

  private extractData(res:Response) {
      if(res.headers.get('access-token')) {
        localStorage.setItem('accessToken', res.headers.get('access-token'));
      }
      
      let body = res.json();
      return body || [];
  }

  private handleError(error:any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }
}