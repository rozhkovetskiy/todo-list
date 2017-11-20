import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: {data: TaskModel[]} = {data: []};
  id: number;
  private editing: {
    tempTitle: string,
    id: number
  } = { tempTitle: '', id: null };

  constructor(
    private listService: ListService,
    private route: ActivatedRoute
  ) { }

  getList(): void {
    this.listService
      .getList()
      // .subscribe(list => this.list = list);
      .subscribe(() => this.list = this.listService.tasks);
  }

  getListFromDate(date) {
    this.listService
      .getList(date)
      .subscribe(() => this.list = this.listService.tasks );
  }

// changeTask(id: number): void {
  //   this.editing.id = id;
  //   this.editing.tempTitle = this.list[_.findIndex(this.list, {'id': id})].title;
  // }
  //
  // applyChanges(): void {
  //   this.editing.id = null;
  // }
  //
  // discardChanges(): void {
  //   this.list[_.findIndex(this.list, {'id': this.editing.id})].title = this.editing.tempTitle;
  //   this.editing.id = null;
  // }

  deleteTask(id: number) {
    this.listService.deleteTask(id);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.date) {
          this.getListFromDate(params.date);
        } else {
          this.getList();
        }
      });
  }

}

