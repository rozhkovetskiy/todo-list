import { Component, OnInit } from '@angular/core';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [NgbDatepickerConfig]
})

export class AddTaskComponent implements OnInit {
  model;
  today: Date = new Date();
  constructor(config: NgbDatepickerConfig) {
    config.minDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.navigation = 'arrows';
  }
  ngOnInit() {
  }

}


