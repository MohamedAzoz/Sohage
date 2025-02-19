import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../../../../service/review.service';
import { User } from '../../../../../models/user';
import { StudentService } from '../../../../../service/student.service';
import { Review } from '../../../../../models/review';

@Component({
  selector: 'app-review-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './review-home.component.html',
  styleUrl: './review-home.component.css'
})
export class ReviewHomeComponent implements OnInit{
  reviews!:Review[]
  student:User={} as User;
  bool:boolean=false;
  message:string='';
constructor(
  private exam_service:ReviewService,
    private student_service:StudentService

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST
      }
    })
    this.exam_service.getReviewByStudentId(this.student).subscribe((R)=>{
      if(R){
        this.reviews=R
      }
    })
  }
  DeleteReview(review:Review){
      if(confirm("sure this delete")){
        this.exam_service.DeleteReview(review).subscribe((value)=>{
          if(value){
            this.message="been Your Delete successfully";
            this.bool=true;
          }else{
            this.message="error in Delete";
            this.bool=false;
          }
        })
      }
    }
    clickReview(id:string){
      this.exam_service.clickReview(id)
    }
}
