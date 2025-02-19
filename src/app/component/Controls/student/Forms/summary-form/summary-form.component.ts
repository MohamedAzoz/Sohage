import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Summary } from '../../../../../models/summary';
import { HttpClient } from '@angular/common/http';
import { SubjectInface } from '../../../../../models/subject_inface';
import { StudentService } from '../../../../../service/student.service';
import { SummaryServiceService } from '../../../../../service/summary-service.service';
import { SubjectServiceService } from '../../../../../service/subject-service.service';
import { StudentData } from '../../../../../models/student-data';
import { User } from '../../../../../models/user';
import { BehaviorSubject } from 'rxjs';
import { NoticesService } from '../../../../../service/notices.service';

@Component({
  selector: 'app-summary-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary-form.component.html',
  styleUrl: './summary-form.component.css'
})
export class SummaryFormComponent implements OnInit{
   private student=new BehaviorSubject<User|null>(null)
 date:Date=new Date
user:User={} as User
userd:StudentData|undefined;
  summary:Summary={} as Summary
  selectFile:File|null=null;
  subjects:SubjectInface[]=[] as SubjectInface[]
  message!:string;
  bool!:boolean;
 constructor(
  private http:HttpClient,
  private notices_service:NoticesService,
  private summary_service:SummaryServiceService,
  private subject_service:SubjectServiceService,
  private student_service:StudentService
 ){
 }
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

onSubmit(summary:Summary){
  this.student.subscribe((ST)=>{
    if(ST){
      this.summary.uploadedBy=ST.id;
      summary.updatedAt=this.date
    this.summary_service.AddSummary(summary).subscribe((value)=>{
      if(value){
        this.message="been Your add successfully";
        this.bool=true;
        this.notices_service.AddNotification('review',summary.subjectId,ST.name,summary.fileUrl)
      }else{
        this.message="error in Add";
        this.bool=false;
      }
    });
    }
    });
}
}
