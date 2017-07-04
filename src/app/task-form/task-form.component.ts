import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Task } from "../models/task";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  @Output() onHidden = new EventEmitter<any>();
  @Input('task-form-mode') taskFormMode: 'create' | 'edit'= 'create';
  task:Task = new Task();
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() {

  }

  onCreateTaskFormResult(e){
    this.closeDialog();
    this.onHidden.emit({created: true, e});
  }

  onEditTaskFormResult(e){
    this.closeDialog();
    this.onHidden.emit({created: true, e});
  }

  openDialog(event){
    this.taskFormMode = event.id ? 'edit' : 'create';
    this.task = event
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  ngOnInit() {
  }

  isCreateMode(){return this.taskFormMode == 'create'}
  isEditMode(){return this.taskFormMode == 'edit'}

}