import {Component, Input, OnInit} from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { TaskModel } from '../shared/models/task.model';
import { IMyDpOptions } from 'mydatepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  @Input() params;
  @Input() dates;

  d = new Date();
  newTask: TaskModel = new TaskModel();
  paramsDate: string;
  addTaskForm: FormGroup;
  myOptions: IMyDpOptions = {
    dateFormat: 'd/m/yyyy',
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() - 1},
    height: '38px'
  };


  constructor(
    private listService: ListService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.createForm();

  }
  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => this.paramsDate = params.date);
  }

  createForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required ],
      myDate: [{jsdate: new Date()}, Validators.required]
    });
  }

  addTask(task) {
    this.newTask.title = task.title;
    this.newTask.date = this.listService.getDateInUTC(task.myDate.jsdate);
    this.listService
      .addTask(this.newTask);
    // add date to date list if it's doesn't exist
    if (_.indexOf(this.dates, this.newTask.date) === -1) {
      // add new date to date list
      this.dates.push(this.newTask.date);
      this.dates.sort();
    }

    // navigate to current date tasks.
    if (this.newTask.date !== this.listService.convertStringDateToUTC(this.paramsDate)) {
      const routerParams = {date: this.listService.transformDate(this.newTask.date), page: 1};
      this.router.navigate([], {queryParams: routerParams, relativeTo: this.route} );
    }
    this.newTask = new TaskModel;
    this.addTaskForm.controls['title'].reset();
  }
}



