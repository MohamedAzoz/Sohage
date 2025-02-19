import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../service/student.service';
import { User } from '../../../../models/user';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { Observable } from 'rxjs';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { Year } from '../../../../models/year';
import { StudentData } from '../../../../models/student-data';

@Component({
  selector: 'app-student-main-home',
  standalone: true,
  imports: [],
  templateUrl: './student-main-home.component.html',
  styleUrl: './student-main-home.component.css'
})
export class StudentMainHomeComponent implements OnInit{
  user:User={} as User;
  college:College={} as College;
  studentData:StudentData={} as StudentData;
  year:Year={} as Year;
constructor(
  private student_service:StudentService,
  private college_service:CollegeServiceService,
){}
  ngOnInit(): void {
   this.student_service.usercurrent().subscribe((student)=>{
    if(student){
        this.user=student;
        this.student_service.setuser(student);
    }
   });

   this.student_service.userData.subscribe((data)=>{
    if(data){
      this.studentData=data
      this.college_service.getCollege(data.collegeId).subscribe((collegeone)=>{
        if(collegeone){
           this.college=collegeone;
        }
       });

      this.college_service.getYear(data.yearId).subscribe((yearone)=>{
        if(yearone){
         this.year=yearone
        }
        });
    }
   });
  }
}


