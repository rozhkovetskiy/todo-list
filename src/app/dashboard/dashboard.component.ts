import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dates: number[];
  public list: TaskModel[];
  public params: any;

  constructor(
    private listService: ListService,
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
    this.params.page = 1;
    (date) ? (this.params.date = this.listService.transformDate(date)) : (this.params.date = 'all');
    const routerParams = {date: this.params.date, page: this.params.page};
    this.router.navigate([], {queryParams: routerParams, relativeTo: this.route});
  }


  public setButtonClass(date: any) {
    let activeClass = '';

    if (date === 'all') {
      activeClass = 'btn-info';
      if (date === this.params.date) {
        activeClass += ' active';
      }
      return activeClass;
    }

    const currentDate = this.listService.getDateInUTC();
    date = parseInt(date, 10);
    if (date < currentDate) {
      activeClass = 'btn-secondary';
    } else if (date > currentDate) {
      activeClass = 'btn-success';
    } else {
      activeClass = 'btn-warning';
    }
    if (date === this.listService.convertStringDateToUTC(this.params.date)) {
      activeClass += ' active';
    }
    return activeClass;
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
