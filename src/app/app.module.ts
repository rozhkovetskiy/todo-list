import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './main/app.component';
import {ListComponent} from './list/list.component';
import {AddTaskComponent} from './add-task/add-task.component';

import {AppRoutingModule} from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';

import {ListService} from './shared/services/list.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaskComponent} from './task/task.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AddTaskComponent,
    AppComponent,
    ListComponent,
    DashboardComponent,
    TaskComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    MyDatePickerModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ListService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
