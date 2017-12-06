import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from '../shared/models/task.model';
import { ListService } from '../shared/services/list.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public editing: {
    tempTitle: string,
    id: number
  } = { tempTitle: '', id: null };
  @Input() params;
  @Input() list;
  @Input() getList;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  changeTaskStatus(task: TaskModel): void {
    const taskData = {isDone: task.isDone};
    this.listService.
      changeTaskProperty(task.id, taskData);
  }

  editTaskTitle(id: number): void {
    this.editing.id = id;
    this.editing.tempTitle = this.list.data[_.findIndex(this.list.data, {'id': id})].title;
  }

  applyChanges(task: TaskModel): void {
    if (task.title !== this.editing.tempTitle) {
      const taskData = {title: task.title};
      this.listService.
        changeTaskProperty(task.id, taskData);
    }
    this.editing.id = null;
  }

  discardChanges(): void {
    this.list.data[_.findIndex(this.list.data, {'id': this.editing.id})].title = this.editing.tempTitle;
    this.editing.id = null;
  }

  deleteTask(id: number) {
    this.listService.deleteTask(id);
  }

  pageChanged(event: any) {
    this.params.page = event.page;
    this.getList(this.params.date, this.params.page, this.params.limit);
  }

  ngOnInit() { }
}

