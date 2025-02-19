import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../../models/college';
import { Department } from '../../../../../models/department';
import { StudentData } from '../../../../../models/student-data';
import { User } from '../../../../../models/user';
import { Year } from '../../../../../models/year';
import { CollegeServiceService } from '../../../../../service/college-service.service';
import { StudentService } from '../../../../../service/student.service';
import { UserServiceService } from '../../../../../service/user-service.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit{
  user:User={} as User
  studentData:StudentData={} as StudentData;
  data:StudentData={} as StudentData;
  colleges:College[]=[]
  departments:Department[]=[];
  years:Year[]=[]
 message!:string;
 collegeid:string='';
 Departmentid:string='';
 bool:boolean=false
 bool1:boolean=false
 bool2:boolean=false
 showPassword: boolean = false;
 constructor(
     private user_service:UserServiceService,
     private student_service:StudentService,
     private college_service:CollegeServiceService,
    ){}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
     ngOnInit(): void {
this.FetchColleges();
this.user.role='student';
 }
 FetchColleges(){
  this.college_service.getColleges().subscribe((data)=>{
    this.colleges=data ?? [];
});
 }
 selectCollege(id:string){
 this.college_service.getDepartments(id).subscribe((data)=>{
 this.departments=data ?? [];
 })
 }
 selectDepartment(id:string){
   this.college_service.getYears(id).subscribe((data)=>{
       this.years=data ?? [];
   })
 }

 onSubmit(US: User) {
   this.user_service.adduser(US).subscribe((R) => {
     if (R) {
       this.bool1 = true;
             this.studentData.studentId=R.id
              this.student_service.setDataUser(this.studentData).subscribe((res) => {
                this.bool2 = !!res;
                this.check();
              });
     } else {
       this.bool1 = false;
       this.check();
     }
   });
 }

 check() {
   if (this.bool1 && this.bool2) {
     this.bool = true;
     this.message = "User has been Add successfully.";
   } else {
     this.bool = false;
     this.message = "Error occurred.";
   }
 }
 }
