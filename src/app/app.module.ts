import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddTaskComponent } from './add-task/add-task.component';


import { ListService } from './shared/services/list.service';

@NgModule({
  declarations: [
    AddTaskComponent,
    AppComponent,
    ListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
