import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Project } from 'src/app/Model/Project/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServices {
  constructor(private _http:HttpClient) { }
  public url = environment.apiUrl +  "/proyectos";


  createProject(projectModel:Project):Observable<Project>
  {
    return  this._http.post<Project>(this.url, projectModel);
  }

  getProject():Observable<Project[]>
  {
    const projectsData =this._http.get<Project[]>(this.url);
    return  projectsData;
  }

  editProject(projectId:number,projectModel:Project):Observable<Project>
  {
    const tasksData =this._http.put<Project>(`${this.url}/${projectId}`, projectModel);
    return  tasksData;
  }

  deleteProject(taskId:Number):Observable<Project>
  {
    const tasksData =this._http.delete<Project>(`${this.url}/${taskId}`);
    return  tasksData;
  }


}
