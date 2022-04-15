import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API_URL } from 'src/app/constants';
import UserModel from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public isLoggedIn = new Subject<boolean>();

   addUser(user : UserModel)
   {
      return this.http.post(`${API_URL}user/`, user);
   }

   getUser(id : String) : Observable<UserModel>
   {
     return this.http.get<UserModel>(`${API_URL}user/${id}`);
   }

   updateUser(body : UserModel)
   {
     return this.http.put(`${API_URL}user`, body, {
      headers :  new HttpHeaders().set('Authorization', localStorage.getItem('auth_token') || "")
    });
   }

   authenticateUser(user : UserModel){
     return this.http.post<any>(`${API_URL}user/authenticate`, user);
   }
}
