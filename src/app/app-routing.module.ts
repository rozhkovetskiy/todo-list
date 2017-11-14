import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddTaskComponent
  },
  {
    path: 'tasks/:date',
    component: ListComponent,
  },
  {
    path: 'list/:date/task/:id',
    component: TaskComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
