import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReviewService } from '../../../../../service/review.service';
import { Exam } from '../../../../../models/exam';
import { User } from '../../../../../models/user';
import { StudentService } from '../../../../../service/student.service';
import { Review } from '../../../../../models/review';

@Component({
  selector: 'app-review-manager',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './review-manager.component.html',
  styleUrl: './review-manager.component.css'
})
export class ReviewManagerComponent implements OnInit{
  reviews:Review[]=[] as Review[]
  student:User={} as User
constructor(
  private review_service:ReviewService,
  private student_service:StudentService,

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST;
      }
    })
    this.review_service.getReviewByStudentId(this.student).subscribe((EX)=>{
        this.reviews=EX;
    })
  }
}
