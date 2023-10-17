import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Project } from 'src/app/Model/Project/Project';
import { Permission } from 'src/app/Model/Permission/Permission';

@Injectable({
  providedIn: 'root'
})
export class PermssionServices {
  constructor(private _http:HttpClient) { }
  public url = environment.apiUrl +  "/permiso_roles";

  getUserPermissions():Observable<Permission[]>
  {
    const PermissionData =this._http.get<Permission[]>(this.url);
    return  PermissionData;
  }




}
