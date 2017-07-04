import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";
import { Router } from "@angular/router";

@Component({
  providers: [TaskService],
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html'
})
export class CreateTaskFormComponent implements OnInit {

  @Output() onFormCreateResult = new EventEmitter<any>();
  constructor(public authService:AuthService,
              private _taskDataService:TaskService,
              private router:Router) { }

  task: Task = new Task();

  ngOnInit() {}

  onCreateTaskSubmit(){
    this._taskDataService.addTask(this.task).subscribe(

        res => {
          this.onFormCreateResult.emit({created: true, res});
        },

        err => {
          var data = err.json();
        }
    )

  }

}