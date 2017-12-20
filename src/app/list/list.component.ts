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

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public changeTaskStatus(task: TaskModel): void {
    const taskData = {isDone: task.isDone};
    this.listService.
      changeTaskProperty(task.id, taskData);
  }

  public editTaskTitle(id: number): void {
    this.editing.id = id;
    this.editing.tempTitle = this.list[_.findIndex(this.list, {'id': id})].title;
  }

  public applyChanges(task: TaskModel): void {
    if (task.title !== this.editing.tempTitle) {
      const taskData = {title: task.title};
      this.listService.
        changeTaskProperty(task.id, taskData);
    }
    this.editing.id = null;
  }

  public discardChanges(): void {
    this.list[_.findIndex(this.list, {'id': this.editing.id})].title = this.editing.tempTitle;
    this.editing.id = null;
  }

  public deleteTask(id: number) {
    this.listService.deleteTask(id);
  }

  public pageChanged(event: any) {
    this.params.page = event;
    const routerParams = {date: this.params.date, page: this.params.page};
    this.router.navigate([], {queryParams: routerParams, relativeTo: this.route});
  }

  ngOnInit() { }
}

