import { Injectable } from "@angular/core";
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
      return this.http.get('http://localhost:3000/tasks.json', { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }

  private extractData(res:Response) {
      let body = res.json();
      return body || [];
  }

  private handleError(error:any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

  addTask( task: Task ):Observable<Task> {
    return this.http.post('http://localhost:3000/tasks.json', task, { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }

  updateTask( task: Task ):Observable<Task> {
    return this.http.put("http://localhost:3000/tasks/" + task.id + ".json", task, { headers: this.authService.authHeaders()})
          .map(this.extractData)
          .catch(this.handleError);
  }
}
