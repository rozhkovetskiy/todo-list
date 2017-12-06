import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TaskModel} from '../shared/models/task.model';
import {ListService} from '../shared/services/list.service';
import {DatePipe} from '@angular/common';
// import {de} from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-dates',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dates: number[];
  public list: TaskModel[];
  currentDate: number = this.getDateInUTC();
  // TODO inteface for params
  public params: any;

  constructor(
              private listService: ListService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.params = {
      date: 'all',
      page: 1,
      limit: 10,
      totalItems: null
    };
    this.list = [];
  }


  public getList(date: string, page: number, limit: number) {
    this.listService
      .getList(date, page, limit)
      .subscribe((response) => {
        this.list = response;
        this.params.totalItems = this.listService.totalItems;
      } );
  }

  public goToDate(date?: Date) {
    this.params = {page: 1, limit: 10, date: null};
    (date) ? (this.params.date = this.transformDate(date)) : (this.params.date = 'all');
    this.router.navigate([], {queryParams: this.params, relativeTo: this.route});
    this.getList(this.params.date, this.params.page, this.params.limit);
  }

  public setButtonClass(date: any) {
    date = parseInt(date, 10);
    if (date < this.currentDate) {
      return 'btn-secondary';
    } else if (date > this.currentDate) {
      return 'btn-success';
    } else {
      return 'btn-warning';
    }
  }

  private getDateInUTC(date?): number {
    if (!date) {
      date = new Date();
    }
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  private getAllDates(): void {
    this.listService
      .getList('all')
      .subscribe(() => this.dates = this.listService.getAllDates());
  }

  private transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.getAllDates();
    this.getList(this.params.date, this.params.page, this.params.limit);
  }
}
