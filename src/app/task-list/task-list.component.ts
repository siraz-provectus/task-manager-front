import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from "@angular/router";
import { TaskFormComponent} from "../task-form/task-form.component";
import { AuthService } from "../services/auth.service";
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  providers: [TaskService],
  viewProviders: [DragulaService],
  templateUrl: './task-list.component.html',
  selector: 'sample'
})
export class TaskListComponent implements OnInit {

  @ViewChild('taskForm') taskForm: TaskFormComponent;
  constructor(public authService:AuthService,
              private _taskDataService:TaskService,
              private dragulaService: DragulaService,
              private router:Router) {
    this.getTasks();
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
  }

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  public tasks:Task[] = [];
  private errorMessage:any = '';

  getTasks() {
    this._taskDataService.getData()
      .subscribe(
          tasks => {
            this.tasks = tasks
          },
          error => this.errorMessage = <any>error);
  }

  ngOnInit() {
  }

  presentTaskForm(){
    var task: Task = new Task();
    this.taskForm.openDialog(task);
  }

  presentEditForm(id) {
    var task = this.tasks.find(x => x.id == id);
    this.taskForm.openDialog(task);
  }

  afterHidden(e){
    this.getTasks();
  }

  private onDrag(args) {
    let [e, el] = args;
    console.log('DRAG')
  }

  private onDrop(args) {
    let [e, el] = args;
    var task_id = e.getElementsByTagName('input')[0].value
    var task = this.tasks.find(x => x.id == task_id);
    task.status = el.getAttribute('container-status')

    this._taskDataService.updateTask(task).subscribe(
          task => {
            this.getTasks();
          },
          error => this.errorMessage = <any>error);
  }

}