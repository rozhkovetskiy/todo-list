import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TaskModel } from '../models/task.model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { Headers } from '@angular/http';


@Injectable()
export class ListService {
  public tasks = {data: []};
  public totalItems: number;
  constructor(private http: Http) { }

  getList(date: string, page?: number, limit?: number): Observable<TaskModel[]> {
    let url = `/api/tasks?_sort=date`;
    if (page) {
      url += `&_start=${(page - 1) * limit}&_limit=${limit}`;
    }
    if (date && date !== 'all') {
      const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
      if (utcDateArray[1] !== 0) {
        --utcDateArray[1];
      }
      const utcDate = (Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0]));
      url += `&date_like=${utcDate}`;
    }
    return this.http.get(url)
      .map(response => {
        this.tasks.data = response.json();
        this.totalItems = +response.headers.get('X-Total-Count');
        return this.tasks.data;
      });
  }

  getAllDates(): any {
    return _.sortBy(_.uniqWith(_.map(this.tasks.data, 'date')));
  }

  addTask(elem: TaskModel): void {
     const headers = new Headers({'Content-Type': 'application/json'});
     this.http
        .post('/api/tasks', elem, {headers: headers})
        .subscribe( (response) => {
          const task = new TaskModel(response.json());
          this.tasks.data.push(task);
        });
  }

  changeTaskProperty(id: number, taskData: object): void {
    const url = `/api/tasks/${id}`;
    const body = JSON.stringify(taskData);
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http
      .patch(url, taskData, {headers: headers})
      .subscribe();
  }

  deleteTask(id: number): void {
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `/api/tasks/${id}`;
    this.http
      .delete(url, {headers: headers})
      .subscribe((response) => {
        _.remove(this.tasks.data, _.find(this.tasks.data, ['id', id]));
      });
  }
}
