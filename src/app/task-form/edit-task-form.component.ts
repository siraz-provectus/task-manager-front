import { Component, OnInit, Output, EventEmitter, Injector} from '@angular/core';
import { TaskFormComponent} from "../task-form/task-form.component";
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
  providers: [TaskService],
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html'
})
export class EditTaskFormComponent implements OnInit {

  private task: Task = new Task();
  private users:User[] = [];
  @Output() onFormEditResult = new EventEmitter<any>();
  constructor(private _taskDataService:TaskService,
              private router:Router,
              private inj:Injector) 
  { 
    this.task = this.inj.get(TaskFormComponent).task
    this.users = this.inj.get(TaskFormComponent).users
    console.log(this.users)
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