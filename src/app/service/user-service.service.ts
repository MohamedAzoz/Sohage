import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
header={}
  constructor(
    private http:HttpClient,
        private CookieService:CookieService,

  ) {

        this.header={Headers:new HttpHeaders({
              "Content-type":"application/json"
              ,'X-Master-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
            })}
   }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.jsonBinApiUrl}/users`)
  }
  getuserone(username:string):Observable<User>{
    return this.http.get<User>(`${environment.jsonBinApiUrl}/users?username=${username}`)
  }
  adduser(user:User):Observable<User>{
    return this.http.post<User>(`${environment.jsonBinApiUrl}/users`,user,this.header)
  }
DeleteUser(users:User):Observable<User>{
      return this.http.delete<User>(`${environment.jsonBinApiUrl}/users/${users.id}`,this.header)
    }
  updateUser (users:User):Observable<User>{
    return this.http.patch<User>(`${environment.jsonBinApiUrl}/users/${users.id}`,users,this.header);
  }
  updatePassword(users:User):Observable<User>{
    return this.http.patch<User>(`${environment.jsonBinApiUrl}/users/${users.id}`,users,this.header);
  }

}
