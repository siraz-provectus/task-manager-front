import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Http, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";
import { Task } from "../models/task";

@Injectable()
export class TaskService {
  
  tasks: Task[] = [];
  constructor(private http:Http,
              public authService:AuthService) {
  }

  getData():Observable<Task[]> {
      return this.http.get(environment.baseUrl + '/tasks.json', { headers: this.authService.authHeaders()})
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

  private handleError(error:any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

  addTask( task: Task ):Observable<Task> {
    return this.http.post(environment.baseUrl +  '/tasks.json', task, { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }

  updateTask( task: Task ):Observable<Task> {
    return this.http.put(environment.baseUrl +  "/tasks/" + task.id + ".json", task, { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }

  deleteTask( task: Task ):Observable<Task> {
    return this.http.delete(environment.baseUrl + "/tasks/" + task.id + ".json", { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }
}
