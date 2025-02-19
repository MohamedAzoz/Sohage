import { Injectable, OnInit } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StudentData } from '../models/student-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {
   private isStudent=new BehaviorSubject<boolean>(false);
   private user=new BehaviorSubject<User|undefined>(undefined);
   private studentData=new BehaviorSubject<StudentData|undefined>(undefined);
   userData=this.studentData.asObservable();

  header={}
   constructor(
    private userService:UserServiceService,
    private http:HttpClient,
    private router:Router

  ) {
    this.header={Headers:new HttpHeaders({
      "Content-type":"application/json"
      ,'X-Master-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
    })}
   }
  ngOnInit(): void {

  }
  setDataUser(user:StudentData):Observable<StudentData>{
    return this.http.post<StudentData>(`${environment.jsonBinApiUrl}/student_data`,user,this.header)
  }
getDataUsers():Observable<StudentData[]>{
    return this.http.get<StudentData[]>(`${environment.jsonBinApiUrl}/student_data`)
  }
getDataUser(id:string):Observable<StudentData>{
    return this.http.get<StudentData>(`${environment.jsonBinApiUrl}/student_data/${id}`);
  }

deleteDataUser(users:StudentData):Observable<StudentData>{
      return this.http.delete<StudentData>(`${environment.jsonBinApiUrl}/student_data/${users.id}`,this.header)
    }
  updateDataUser (users:StudentData):Observable<StudentData>{
    return this.http.patch<StudentData>(`${environment.jsonBinApiUrl}/student_data/${users.id}`,users,this.header);
  }

  checkStudent(username:string){
    this.userService.getUsers().subscribe((users)=>{
      let userRole=users.find((user)=>user.username==username && user.role=='student');
      if(userRole){
        this.isStudent.next(true);
        this.user.next(userRole);
      }else{
        this.isStudent.next(false);
      }
    })
  }

  isbool():Observable<boolean>{
    return  this.isStudent.asObservable();
  }

user_student():boolean{
  return (this.isStudent.value)?true:false;
}
usercurrent():Observable<User|undefined>{
  return this.user.asObservable();
}

setuser(user:User){
   this.getDataUsers().subscribe((data)=>{
    let us=data.find((v)=>(v.studentId==user.id))
    if(us){
      this.studentData.next(us)
    }else{
      this.studentData.next(undefined);
    }
  })
}


}
