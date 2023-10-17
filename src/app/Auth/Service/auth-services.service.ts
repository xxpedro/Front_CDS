import { Auth } from './../ModelAuth/Auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'enviroment';
import { User } from 'src/app/Model/User/User';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthServices{
  constructor(private _http:HttpClient, private localStorage:LocalStorageService, private router: Router) { }
  public url = environment.apiUrl +  "/usuarios";
  public isAuthenticated = false;


  Login(authModel: Auth): Observable<{ isAuthenticated: boolean, user: User | null }> {
    return this._http.get<User[]>(this.url).pipe(
      map(users => {
        const user = this.findUser(users, authModel.name, authModel.pass);
        const isAuthenticated = !!user;
        this.isAuthenticated = isAuthenticated;

        return { isAuthenticated, user };
      })
    );
  }

  private findUser(users: User[], username: string, password: string): User | null {
    return users.find(user => user.name === username && user.pass === password) || null;
  }
  registerUser(AuthModel:User):Observable<User>
  {
    let userFounded = this._http.post<User>(this.url, AuthModel);
    return userFounded;
  }


  logOut()
  {
    debugger
    this.localStorage.clear("loggeduser")
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
  }

}
