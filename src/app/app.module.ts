import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { ListService } from './shared/services/list.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
