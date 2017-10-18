import { Component, OnInit } from '@angular/core';
import { ListModel } from '../shared/models/list.model';
import { ListService } from '../shared/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: ListModel[] = [];

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
