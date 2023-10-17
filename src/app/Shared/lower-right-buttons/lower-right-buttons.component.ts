import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { AuthServices } from 'src/app/Auth/Service/auth-services.service';
import { Permission } from 'src/app/Model/Permission/Permission';
import { PermssionServices } from 'src/app/Pages/PagesServices/PermissionServices/PermssionServices';

@Component({
  selector: 'app-lower-right-buttons',
  templateUrl: './lower-right-buttons.component.html',
  styleUrls: ['./lower-right-buttons.component.css']
})
export class LowerRightButtonsComponent {
  constructor(private _localStorage:LocalStorageService,private NgxpermissionsService: NgxPermissionsService,private _permissionServices:PermssionServices, private _authServices:AuthServices)
  {
    this.getPermissions()
  }




  async getPermissions() {
    await this._permissionServices.getUserPermissions()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar los permisos:', error);
          return throwError('Ocurrió un error al cargar los permisos.');
        }),
        switchMap((data: Permission[]) => {
          const logueedUser = this._localStorage.retrieve('loggeduser')['roleId'];
          const permisos = data.filter(x => x.roleId === logueedUser).map(item => item.permiso);
          console.log(permisos);
          this.NgxpermissionsService.loadPermissions(permisos);
          return of(true);
        })
      )
  }
  logOuth()
  {
    this._authServices.logOut()
  }


}
