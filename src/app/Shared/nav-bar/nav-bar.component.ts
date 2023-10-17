import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthServices } from 'src/app/Auth/Service/auth-services.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  LogedUserName!:string;

  constructor(private localStorage:LocalStorageService, private _authServices:AuthServices )
  {

  }
  ngOnInit(): void {
   this.desctuctureName();
  }

  desctuctureName()
  {
     const loggedName = this.localStorage.retrieve('loggedUser');
     const { name, lastName } = loggedName;
     this.LogedUserName = (name[0] + lastName[0]).toUpperCase();

  }

  logOuth()
  {
    this._authServices.logOut()
  }
}
