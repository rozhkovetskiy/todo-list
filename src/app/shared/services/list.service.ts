import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TaskModel } from '../models/task.model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { Headers } from '@angular/http';

@Injectable()
export class ListService {
  // public data: TaskModel[];
  public tasks = {data: []};

  constructor(private http: Http) { }

  // getData() {
  //   return this.data;
  // }

  // getList(date?: string): Observable<TaskModel[]> {
  //   return this.http.get('/api/tasks')
  //     .map(response => {
  //       if (date) {
  //         const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
  //         if (utcDateArray[1] !== 0) {
  //           --utcDateArray[1];
  //         }
  //         const utcDate = (Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0])).toString();
  //         this.tasks.data = _.filter(response.json(), [ 'date', utcDate]);
  //       } else {
  //         this.tasks.data = _.sortBy(response.json(), 'date');
  //         console.log(this.tasks.data]);
  //       }
  //       return this.tasks.data;
  //     });
  // }

  getList(date?: string): Observable<TaskModel[]> {
    let url = `/api/tasks?_sort=date`;
    if (date) {
      const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
      if (utcDateArray[1] !== 0) {
        --utcDateArray[1];
      }
      const utcDate = (Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0])).toString();
      url += `&date_like=${utcDate}`;
    }
    return this.http.get(url)
      .map(response => {
        this.tasks.data = response.json();
        return this.tasks.data;
      });
  }

  getAllDates(): any {
    return _.sortBy(_.uniqWith(_.map(this.tasks.data, 'date')));
  }

  getListFromDate(date: string): TaskModel[] {
    const utcDateArray = _.map(_.split(date, '-'), _.toNumber);
    if (utcDateArray[1] !== 0) {
      --utcDateArray[1];
    }
    const utcDate = (Date.UTC(utcDateArray[2], utcDateArray[1], utcDateArray[0])).toString();
    return _.filter(this.tasks.data, [ 'date', utcDate]);
  }

  addTask(elem: TaskModel): void {
    // this.data.push(elem);
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
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http
      .patch(url, taskData, {headers: headers})
      .subscribe();
  }

  deleteTask(id: number): void {
    console.log(`id: ${id}`);
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `/api/tasks/${id}`;
    this.http
      .delete(url, {headers: headers})
      .subscribe((response) => {
        _.remove(this.tasks.data, _.find(this.tasks.data, ['id', id]));
      });
  }

  // https://stackoverflow.com/questions/40774697/how-to-group-array-of-objects-by-key
  // getAllDates(): any {
  //   // this.getList().subscribe(() => {
  //     console.log('list when calling getAllDates from service:' + this.data);
  //     return _.groupBy(this.data, 'date');
  //   // });
  // }

}
