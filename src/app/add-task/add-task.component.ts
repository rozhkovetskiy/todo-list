import { Component, OnInit } from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { TaskModel } from '../shared/models/task.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  newTask: TaskModel = new TaskModel();
  minDate = new Date();
  maxDate = new Date(2099, 11, 31);
  addTaskForm: FormGroup;

  constructor(
    private listService: ListService,
    private fb: FormBuilder) {
      this.createForm();

  }

  createForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required ],
      date: [new Date(), Validators.required ]
    });
  }
  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-green'});
  }

  addTask(task) {
    this.newTask.title = task.title;
    this.newTask.date = this.getDateInUTC(task.date);
    this.listService
      .addTask(this.newTask);
    this.newTask = new TaskModel;
  }

  private getDateInUTC(date): number {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }



}



