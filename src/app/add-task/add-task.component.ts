import { Component, OnInit } from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { TaskModel } from '../shared/models/task.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  newTask: TaskModel = new TaskModel();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2099, 11, 31);
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-orange'});
  }

  addTask() {
    this.listService
      .addTask(this.newTask);
    this.newTask = new TaskModel;
  }
}



