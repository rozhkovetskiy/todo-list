import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dates',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dates: number[];
  public list: TaskModel[];
  // TODO inteface for params
  public params: any;
  private currentDate: number = this.getDateInUTC();

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
    console.log('get list works');
    this.listService
      .getList(date, page, limit)
      .subscribe((response) => {
        this.list = response;
        this.params.totalItems = this.listService.totalItems;
      } );
  }

  public goToDate(date?: Date) {
    this.params.page = 1;
    (date) ? (this.params.date = this.transformDate(date)) : (this.params.date = 'all');
    const routerParams = {date: this.params.date, page: this.params.page};
    this.router.navigate([], {queryParams: routerParams, relativeTo: this.route});
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

  private transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  private getDates(): void {
    this.listService
      .getDates()
      .subscribe((response) => {
        this.dates = response;
      });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if (params.date && params.date !== this.params.date) {
          this.params.date = params.date;
        }
        if (params.page && +params.page !==  this.params.page) {
          this.params.page = +params.page;
        }
        this.getList(this.params.date, this.params.page, this.params.limit);
      });
    this.getDates();
  }
}
