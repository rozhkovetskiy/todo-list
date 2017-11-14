import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TaskModel } from '../models/task.model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class ListService {
  public data: TaskModel[];

  constructor(private http: Http) { }

  getList(): Observable<TaskModel[]> {
    return this.http.get('/assets/mock-api/list.json')
      .map(response => this.data = response.json().items);
  }

  reformatToDates(): any {
    return _.groupBy(this.data, 'date');
  }

  getAllDates(): any {
    return _.uniqWith(_.map(this.data, 'date'));
  }

  getData() {
    return this.data;
  }

  addTask(elem): void {
    this.data.push(elem);
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

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
