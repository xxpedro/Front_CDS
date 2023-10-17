import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { SharedModule } from '../Shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    ProjectsComponent,
    UsersComponent,
    TasksComponent,
    PagesComponent

  ],

  exports:
  [
    ProjectsComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    FormsModule,
    BreadcrumbModule
  ],
  bootstrap: [ProjectsComponent,
    TasksComponent,
    PagesComponent]
})
export class PagesModule { }
