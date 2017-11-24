import { Component, OnInit } from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { TaskModel } from '../shared/models/task.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe} from '@angular/common';

import * as _ from 'lodash';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  newTask: TaskModel = new TaskModel();
  paramsDate: string;
  minDate = new Date();
  maxDate = new Date(2099, 11, 31);
  addTaskForm: FormGroup;

  constructor(
    private listService: ListService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {
      this.createForm();

  }
  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-green'});
    this.route.queryParams
      .subscribe((params) => this.paramsDate = params.date);
  }

  createForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required ],
      date: [new Date(), Validators.required ]
    });
  }

  addTask(task) {
    this.newTask.title = task.title;
    this.newTask.date = this.getDateInUTC(task.date);
    this.listService
      .addTask(this.newTask);
    if (this.newTask.date !== this.convertStringDateToUTC(this.paramsDate)) {
      const params = {date: this.transformDate(task.date)};
      this.router.navigate([], {queryParams: params, relativeTo: this.route} );
    }
    this.newTask = new TaskModel;
  }



  private getDateInUTC(date?): number {
    if (!date) {
      date = new Date();
    }
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  private convertStringDateToUTC (date: string): number {
    const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
    if (utcDateArray[1] !== 0) {
      --utcDateArray[1];
    }
    return Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0]);
  }
}



