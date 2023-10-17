import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from '../Auth/Guard/auth.guard';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
const routes: Routes = [
  {
    path: 'project', component: PagesComponent,
    children: [
      { path: '', component: ProjectsComponent, canActivate: [AuthGuard]},
      {path: 'user', component: UsersComponent,canActivate: [AuthGuard]},
      {path: ':id',children: [{ path: 'task', component: TasksComponent , canActivate: [AuthGuard]}]}
    ],
  },
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
