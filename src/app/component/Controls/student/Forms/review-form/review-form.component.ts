import { Component, OnInit } from '@angular/core';
import { Review } from '../../../../../models/review';
import { SubjectInface } from '../../../../../models/subject_inface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../../../service/review.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../../../../service/student.service';
import { environment } from '../../../../../../environments/environment.development';
import { SubjectServiceService } from '../../../../../service/subject-service.service';
import { StudentData } from '../../../../../models/student-data';
import { User } from '../../../../../models/user';
import { BehaviorSubject } from 'rxjs';
import { NoticesService } from '../../../../../service/notices.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit{
  private student=new BehaviorSubject<User|null>(null)
 date:Date=new Date
user:User={} as User
userd:StudentData|undefined;
  review:Review={} as Review
  selectFile:File|null=null;
  subjects:SubjectInface[]=[] as SubjectInface[]
  message!:string;
  bool!:boolean;
 constructor(
  private http:HttpClient,
  private notices_service:NoticesService,
  private review_service:ReviewService,
  private subject_service:SubjectServiceService,
  private student_service:StudentService,
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

onSubmit(review:Review){
  this.student.subscribe((ST)=>{
    if(ST){
      this.review.uploadedBy=ST.id;
      review.updatedAt=this.date
    this.review_service.AddReview(review).subscribe((EX)=>{
      if(EX){
        this.message="been Your add successfully";
        this.bool=true;
        this.notices_service.AddNotification('review',review.subjectId,ST.name,review.fileUrl)
      }else{
        this.message="error in Add";
        this.bool=false;
      }
    });
    }
    });
}
}
