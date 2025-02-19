import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserServiceService } from '../../../../service/user-service.service';
import { StudentService } from '../../../../service/student.service';
import { StudentData } from '../../../../models/student-data';
import { DoctorService } from '../../../../service/doctor.service';
import { DoctorData } from '../../../../models/doctor-data';

@Component({
  selector: 'app-form-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './form-delete-user.component.html',
  styleUrl: './form-delete-user.component.css'
})
export class FormDeleteUserComponent implements OnInit{
  users:User[]=[];
  bool:boolean=false;
  bool1:boolean=false;
  bool2:boolean=false;
  message:string='';
constructor(
      private user_service:UserServiceService,
      private student_service:StudentService,
      private doctor_service:DoctorService,
){
}
  ngOnInit(): void {
  }
  selecteRole(role:string){
    this.user_service.getUsers().subscribe((data)=>{
      this.users=data.filter((value)=>(value.role===role));
      this.bool1=true;
     });
  }
  DeleteUser(user:User){
    let Sdata:StudentData|undefined;
    let Ddata:DoctorData|undefined;
    this.student_service.getDataUsers().subscribe((value)=>{
       if(value){
        Sdata=value.find((v)=>(v.studentId==user.id))
      }
    });
    this.doctor_service.getDataUsers().subscribe((value)=>{
      if(value){
        Ddata=value.find((v)=>(v.doctorId==user.id))
      }
    })
    if(confirm("sure this delete")){
      this.user_service.DeleteUser(user).subscribe((value)=>{
      if(value){
        this.bool1=false;
        if(value.role=='student' && Sdata){
          this.student_service.deleteDataUser(Sdata).subscribe();
        }
        if(value.role=='doctor'&& Ddata){
          this.doctor_service.deleteDataUser(Ddata).subscribe()
        }
        this.message="been Year Delete successfully";
        this.bool2=true;
      }else{
        this.message="error in Delete";
        this.bool2=false;
      }
    })
  }
  }
}

