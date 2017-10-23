import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: TaskModel[] = [];
  private editting: {
    tempTitle: string,
    id: number
  } = { tempTitle: '', id: null };

  constructor( private listService: ListService) { }

  getList(): void {
    this.listService
      .getList()
      .subscribe(list => this.list = list);
  }

  changeTask(id: number): void {
    this.editting.id = id;
    this.editting.tempTitle = this.list[_.findIndex(this.list, {'id': id})].title;
  }

  applyChanges(): void {
    this.editting.id = null;
  }

  discardChanges(): void {
    this.list[_.findIndex(this.list, {'id': this.editting.id})].title = this.editting.tempTitle;
    this.editting.id = null;
  }

  deleteTask(index: number) {
    this.listService.deleteTask(this.list[index]);
  }

  ngOnInit() {
    this.getList();
  }

}

