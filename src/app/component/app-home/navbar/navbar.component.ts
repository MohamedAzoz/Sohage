import { Component , AfterViewInit, OnInit, PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CollegeServiceService } from '../../../service/college-service.service';
import { College } from '../../../models/college';
import { AdminService } from '../../../service/admin.service';
import { AuthenticationServiceService } from '../../../service/authentication-service.service';
import { DoctorService } from '../../../service/doctor.service';
import { StudentService } from '../../../service/student.service';
import { UserServiceService } from '../../../service/user-service.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit ,OnInit{
  colleges:College[]=[]
  admin!:string;
  doctor!:string;
  student!:string;
  name!:string;
  role!:string;
  islook:boolean=false;
  isAdmin:boolean=false;
  isStudent:boolean=false;
  isDoctor:boolean=false;
  constructor(
    private college_service:CollegeServiceService,
    private auth_service:AuthenticationServiceService,
    private admin_service:AdminService,
    private student_service:StudentService,
    private doctor_service:DoctorService,
    private user_service:UserServiceService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.auth_service.current_bool.subscribe((bool)=>{
      this.islook=bool;
    });

    this.admin_service.isbool().subscribe((bool)=>{
      this.isAdmin=bool;
    });

    this.doctor_service.isbool().subscribe((bool)=>{
      this.isDoctor=bool;
    });
    this.student_service.isbool().subscribe((bool)=>{
      this.isStudent=bool;
    });

    this.college_service.getColleges().subscribe((data)=>{
      this.colleges=data;
    });
    this.auth_service.currentUser.subscribe((user)=>{
      if(user){
        this.getUser(user.id)
      }
    })

    // this.admin_service.usercurrent().subscribe((userData)=>{
    //   if(userData){
    //     this.admin=userData.name;
    //   }
    // });
    // this.doctor_service.usercurrent().subscribe((userData)=>{
    //   if(userData){
    //       this.doctor=userData.name;
    //   }
    // });
    // this.student_service.usercurrent().subscribe((userData)=>{
    //   if(userData){
    //     this.student=userData.name;
    //   }
    // });

  }

     ngAfterViewInit() {
       if (isPlatformBrowser(this.platformId)) {
         new bootstrap.ScrollSpy(document.body, {
           target: '#nav',
         });
       }
     }
getUser(id:string){
  let userObservable=new Observable<User|undefined>();
this.user_service.getUsers().subscribe((users)=>{
let user=users.find((us)=>(us.id==id));
if(user){
  switch(user.role){
    case'admin':
  userObservable=  this.admin_service.usercurrent()
    break;
    case'student':
    userObservable=this.student_service.usercurrent()
    break;
    case'doctor':
   userObservable= this.doctor_service.usercurrent()
    break;
  }
  userObservable.subscribe((userData)=>{
    if(userData){
      this.name=userData.name;
      this.role=userData.role;
    }
  });
}else{
  this.name='';
  this.role='';
}
});
}
  refresh(){
    window.location.reload();
  }

  Logout(){
    this.auth_service.logout();
 }
}
