import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TaskModel} from '../shared/models/task.model';
import {ListService} from '../shared/services/list.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dates',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dates: number[];
  list: TaskModel[] = [];
  curentDate: number = this.getDateInUTC();

  constructor(private listService: ListService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllDates();
  }

  getAllDates(): void {
    this.listService
      .getList()
      .subscribe(() => this.dates = this.listService.getAllDates());
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  getDateInUTC(date?): number {
    if (!date) {
      date = new Date();
    }
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
