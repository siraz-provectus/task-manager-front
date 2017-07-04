import { Component, OnInit, Output, EventEmitter, Injector} from '@angular/core';
import { TaskFormComponent} from "../task-form/task-form.component";
import { AuthService } from "../services/auth.service";
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";
import { Router } from "@angular/router";

@Component({
  providers: [TaskService],
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html'
})
export class EditTaskFormComponent implements OnInit {

  task: Task = new Task();
  @Output() onFormEditResult = new EventEmitter<any>();
  constructor(public authService:AuthService,
              private _taskDataService:TaskService,
              private router:Router,
              private inj:Injector) 
  { 
    this.task = this.inj.get(TaskFormComponent).task
 
  }

  ngOnInit() {}

  onEditTaskSubmit(){
    this._taskDataService.updateTask(this.task).subscribe(
      task => {
        this.onFormEditResult.emit({created: true, task});
      },
      err => {
        var data = err.json();
      }
    )
  }

}