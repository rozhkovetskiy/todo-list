import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TaskModel} from '../shared/models/task.model';
import {ListService} from '../shared/services/list.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dates: string[];
  list: TaskModel[] = [];
  date: Date = new Date(2017, 12, 24);

  constructor(private listService: ListService) { }

  getList(): void {
    this.listService
      .getList()
      .subscribe(() => this.dates = this.listService.getAllDates());
  }

  ngOnInit() {
    this.getList();
  }
}
