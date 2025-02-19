import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../../../models/review';
import { SubjectInface } from '../../../../../models/subject_inface';
import { ReviewService } from '../../../../../service/review.service';
import { StudentService } from '../../../../../service/student.service';

@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-review.component.html',
  styleUrl: './update-review.component.css'
})
export class UpdateReviewComponent implements OnInit{
  review:Review={} as Review;
  reviews:Review[]=[] as Review[]
  selectFile:File|null=null;
  subjects!:SubjectInface[]|null
  message!:string;
  bool:boolean=false;
  bool2:boolean=false;
 constructor(
  private http:HttpClient,
  private review_service:ReviewService,
  // private subject_service:SubjectServiceService,
  private student_service:StudentService,
  private location:Location
 ){}
  ngOnInit(): void {
this.review_service.currentReview.subscribe((data)=>{
  if(data){
    this.review=data;
  }
})
    }
    back(){
      this.location.back();
    }

onSubmit(review:Review){
    this.review_service.updateReview(review).subscribe((Value)=>{
      if(Value){
        this.message="been Your Update successfully";
        this.bool=true;
      }else{
        this.message="error in Update";
        this.bool2=true;
      }
    })
}
}
