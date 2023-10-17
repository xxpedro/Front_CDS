import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './404/not-found-page/not-found-page.component';
import { PagesRoutingModule } from './Pages/pages.routing';
import { authRoutingModule } from './Auth/auth.routing';

const routes: Routes = [
  {path:'**', component:NotFoundPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,PagesRoutingModule,authRoutingModule]
})
export class AppRoutingModule { }
