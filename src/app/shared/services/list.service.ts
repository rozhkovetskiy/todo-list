import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TaskModel } from '../models/task.model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListService {
  public data: any;

  constructor(private http: Http) { }

  getList(): Observable<TaskModel[]> {
    return this.http.get('/assets/mock-api/list.json')
      .map(response => response.json().items);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
