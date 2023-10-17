import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Task } from 'src/app/Model/Task/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskServices {

  constructor(private _http:HttpClient) { }
  public url = environment.apiUrl +  "/tareas";

  createTask(projectModel:Task):Observable<Task>
  {
    return this._http.post<Task>(this.url, projectModel);
  }

  getTask():Observable<Task[]>
  {
    const tasksData =this._http.get<Task[]>(this.url);
    return  tasksData;
  }

  deleteTask(taskId:Number):Observable<Task>
  {
    const tasksData =this._http.delete<Task>(`${this.url}/${taskId}`);
    return  tasksData;
  }
  editTask(taskId:number,taskModel:Task):Observable<Task>
  {
    const tasksData =this._http.put<Task>(`${this.url}/${taskId}`, taskModel);
    return  tasksData;
  }

  getTaskById(taskId:Number, taskModel:Task):Observable<Task>
  {
    const tasksData =this._http.get<Task>(`${this.url}/${taskId}`);
    return  tasksData;
  }

}
