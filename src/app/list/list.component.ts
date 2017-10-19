import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: TaskModel[] = [];

  constructor( private listService: ListService) { }

  getList(): void {
    this.listService
      .getList()
      .subscribe(list => this.list = list);
  }

  ngOnInit() {
    this.getList();
  }

}
