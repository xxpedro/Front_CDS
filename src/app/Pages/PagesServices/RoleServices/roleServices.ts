import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { Role } from 'src/app/Model/Role/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleServices {

  constructor(private _http:HttpClient) { }
  public url = environment.apiUrl +  "/roles";

  createRole(projectModel:Role):Observable<Role>
  {
    return this._http.post<Role>(this.url, projectModel);
  }

  getRole():Observable<Role[]>
  {
    const tasksData =this._http.get<Role[]>(this.url);
    return  tasksData;
  }

  deleteRole(taskId:Number):Observable<Role>
  {
    const tasksData =this._http.delete<Role>(`${this.url}/${taskId}`);
    return  tasksData;
  }
  editRole(taskId:number,taskModel:Role):Observable<Role>
  {
    const tasksData =this._http.put<Role>(`${this.url}/${taskId}`, taskModel);
    return  tasksData;
  }

  getRoleById(taskId:Number, taskModel:Role):Observable<Role>
  {
    const tasksData =this._http.get<Role>(`${this.url}/${taskId}`);
    return  tasksData;
  }

}
