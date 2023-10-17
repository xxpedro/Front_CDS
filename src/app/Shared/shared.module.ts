import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ModalComponent } from './modal/modal.component';
import { LowerRightButtonsComponent } from './lower-right-buttons/lower-right-buttons.component';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    ModalComponent,
    LowerRightButtonsComponent
  ],
  exports:[
    SideBarComponent,
    NavBarComponent,
    ModalComponent,
    LowerRightButtonsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot()

  ],
  bootstrap: [SideBarComponent,NavBarComponent]
})
export class SharedModule { }
