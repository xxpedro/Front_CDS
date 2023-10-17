import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { AuthGuard } from './Guard/auth.guard';

@NgModule({
  providers: [AuthGuard],

  declarations: [
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot(),

  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]


})
export class AuthModule { }
