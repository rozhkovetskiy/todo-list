import {Component, OnChanges, OnInit} from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { TaskModel } from '../shared/models/task.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit, OnChanges {
  bsConfig: Partial<BsDatepickerConfig>;
  newTask: TaskModel = new TaskModel();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2099, 11, 31);
  addTaskForm: FormGroup;
  titleCheck: boolean;

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
    this.bsConfig = Object.assign({}, {containerClass: 'theme-orange'});
  }

  ngOnChanges() { }

  addTask(task) {
    this.listService
      .addTask(this.newTask);
    this.newTask = new TaskModel;
  }




}



