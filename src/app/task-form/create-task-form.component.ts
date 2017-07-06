import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskFormComponent} from "../task-form/task-form.component";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
  providers: [TaskService],
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html'
})
export class CreateTaskFormComponent implements OnInit {

  @Output() onFormCreateResult = new EventEmitter<any>();
  constructor(private _taskDataService:TaskService,
              private router:Router,
              private inj:Injector) { this.users = this.inj.get(TaskFormComponent).users }

  private task: Task = new Task();
  private users:User[] = [];

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