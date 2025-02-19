import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';
import { StudentService } from './student.service';
import { DoctorService } from './doctor.service';
import { AdminService } from './admin.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  // private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject=new BehaviorSubject<User | null>(null);
  public currentUser=this.currentUserSubject.asObservable();
  private boolBehavior=new BehaviorSubject<boolean>(false);
  public current_bool=this.boolBehavior.asObservable();


  constructor(
    // private Http:HttpClient,
    private router:Router,
    private CookieService:CookieService,
    private users:UserServiceService,
    private student_service:StudentService,
    private doctor_service:DoctorService,
    private admin_service:AdminService,
  ) {
  }

//============realy databaes========
  /*login(username: string, password: string): void{
     this.Http.post<{ token: string }>(`${environment.apiUrl}/login`, { username, password }).subscribe(
      (response) => {
        this.CookieService.set('authToken', response.token);
        this.isLoggedInSubject.next(true);
      });
  }


  logout(): void {
    this.CookieService.delete('authToken');
    this.isLoggedInSubject.next(false);
  }

  checkLoginStatus(): void {
    const token = this.CookieService.get('authToken');
    if (token) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }*/


//============fake databaes========
  login(username:string,password:string):void{
    this.users.getUsers().subscribe((data)=>{
        let user=data.find((value)=>(value.username==username  && value.password==password))
    if(user){
      this.student_service.checkStudent(user.username);
      this.doctor_service.checkDoctor(user.username);
      this.admin_service.checkAdmin(user.username);
      this.student_service.isbool().subscribe((bool)=>{
        if(bool){
        this.router.navigate(['student']);
        }
      });
      this.doctor_service.isbool().subscribe((bool)=>{
        if(bool){
        this.router.navigate(['Doctor']);
      }
      });
      this.admin_service.isbool().subscribe((bool)=>{
        if(bool){
          this.router.navigate(['Admin']);
        }
      })
      this.currentUserSubject.next(user);
      this.CookieService.set("token",user.username);
      this.boolBehavior.next(true);
    }else{
      this.currentUserSubject.next(null);
      this.boolBehavior.next(false);
    }
    })
  }


  logout():void{
    this.currentUserSubject.next(null);
    this.CookieService.delete("token");
    this.boolBehavior.next(false)
  }

get isAuthenticated():boolean{
  return (this.currentUserSubject.value)?true:false;
}


}
