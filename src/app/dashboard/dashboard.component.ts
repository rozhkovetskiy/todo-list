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
  dates: Date[];
  list: TaskModel[] = [];

  constructor(private listService: ListService,
              private datePipe: DatePipe) { }

  getAllDates(): void {
    this.listService
      .getList()
      .subscribe(() => this.dates = this.listService.getAllDates());
  }

  ngOnInit() {
    this.getAllDates();
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
