import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TaskModel } from '../models/task.model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { Headers } from '@angular/http';

@Injectable()
export class ListService {
  public data: TaskModel[];

  constructor(private http: Http) { }

  getData() {
    return this.data;
  }

  getList(): Observable<TaskModel[]> {
    return this.http.get('/api/tasks')
      .map(response => this.data = _.sortBy(response.json(), 'date'));
  }

  // reformatToDates(): any {
  //   return _.groupBy(this.data, 'date');
  // }

  getAllDates(): any {
    return _.sortBy(_.uniqWith(_.map(this.data, 'date')));
  }

  getListFromDate(date: string): TaskModel[] {
    const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
    if (utcDateArray[1] !== 0) {
      --utcDateArray[1];
    }
    const utcDate = (Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0])).toString();
    return _.filter(this.data, ['date', utcDate]);
  }

  addTask(elem) {
    // this.data.push(elem);
     const headers = new Headers({'Content-Type': 'application/json'});
     this.http
        .post('/api/tasks', elem, {headers: headers})
        .subscribe((response) => {
          console.log(response);
        });
  }

  deleteTask(item): void {
    _.pull(this.data, item);
  }

  // https://stackoverflow.com/questions/40774697/how-to-group-array-of-objects-by-key
  // getAllDates(): any {
  //   // this.getList().subscribe(() => {
  //     console.log('list when calling getAllDates from service:' + this.data);
  //     return _.groupBy(this.data, 'date');
  //   // });
  // }

}
