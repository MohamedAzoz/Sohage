import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../../../service/test.service';
import { Test } from '../../../../../models/test';
import { HttpClient } from '@angular/common/http';
import { SubjectInface } from '../../../../../models/subject_inface';
import { StudentService } from '../../../../../service/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubjectServiceService } from '../../../../../service/subject-service.service';
import { StudentData } from '../../../../../models/student-data';
import { User } from '../../../../../models/user';
import { BehaviorSubject } from 'rxjs';
import { NoticesService } from '../../../../../service/notices.service';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css'
})
export class TestFormComponent implements OnInit{
 private student=new BehaviorSubject<User|null>(null)
 date:Date=new Date
user:User={} as User
userd:StudentData|undefined;
  test:Test={} as Test
  selectFile:File|null=null;
  subjects:SubjectInface[]=[] as SubjectInface[]
  message!:string;
  bool!:boolean;
 constructor(
  private http:HttpClient,
  private notices_service:NoticesService,
  private test_service:TestService,
  private subject_service:SubjectServiceService,
  private student_service:StudentService
 ){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
      this.student.next(ST)
        this.student_service.setuser(ST);
      }
    });
    this.student_service.userData.subscribe((data)=>{
        if(data){
          this.subject_service.setSubs(data.yearId);
        }
      });
      this.subject_service.currentSubs.subscribe((s)=>{
        if(s){
          this.subjects=s
        }else{
          this.subjects=[]
        }
      })
    }

onSubmit(test:Test){
  this.student.subscribe((ST)=>{
    if(ST){
      this.test.uploadedBy=ST.id;
      test.updatedAt=this.date
    this.test_service.AddTest(test).subscribe((value)=>{
      if(value){
        this.message="been Your add successfully";
        this.bool=true;
        this.notices_service.AddNotification('review',test.subjectId,ST.name,test.fileUrl)
      }else{
        this.message="error in Add";
        this.bool=false;
      }
    });
    }
    });
}
}
