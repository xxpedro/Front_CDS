import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User/User';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private _http:HttpClient) { }
  public url = environment.apiUrl +  "/usuarios";

  createUser(userModel:User):Observable<User>
  {
    return this._http.post<User>(this.url, userModel);
  }

  getUser():Observable<User[]>
  {
    const userData =this._http.get<User[]>(this.url);
    return  userData;
  }

  deleteUser(userId:Number):Observable<User>
  {
    const userData =this._http.delete<User>(`${this.url}/${userId}`);
    return  userData;
  }
  editUser(userId:Number,userModel:User):Observable<User>
  {
    const userData =this._http.put<User>(`${this.url}/${userId}`, userModel);
    return  userData;
  }

  getUserById(userId:Number):Observable<User>
  {
    const userData =this._http.get<User>(`${this.url}/${userId}`);
    return  userData;
  }
}
