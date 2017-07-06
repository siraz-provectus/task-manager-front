import { Component, OnInit, Input, Output, EventEmitter, Compiler, ChangeDetectorRef} from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { Task } from "../models/task";

@Component({
  providers: [UserService],
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  @Output() onHidden = new EventEmitter<any>();
  @Input('task-form-mode') taskFormMode: 'create' | 'edit'= 'create';
  task:Task = new Task();
  users:User[] = [];
  rerender = false;
  private errorMessage:any = '';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private cdRef:ChangeDetectorRef, private _userDataService:UserService) {
    this.getUsers()
  }

  onCreateTaskFormResult(e){
    this.closeDialog();
    this.onHidden.emit({created: true});
  }

  onEditTaskFormResult(e){
    this.closeDialog();
    this.onHidden.emit({created: true});
  }

  openDialog(event){
    this.rerender = false;
    this.taskFormMode = event.id ? 'edit' : 'create';
    this.task = event
    console.log(this.users)
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.doRerender()
    this.modalActions.emit({action:"modal", params:['close']});
  }

  private doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
  }

  private  getUsers() {
    this._userDataService.getData()
      .subscribe(
          users => {
            this.users = users
          },
          error => this.errorMessage = <any>error
      );
  }

  ngOnInit() {
  }

  isCreateMode(){return this.taskFormMode == 'create'}
  isEditMode(){return this.taskFormMode == 'edit'}

}