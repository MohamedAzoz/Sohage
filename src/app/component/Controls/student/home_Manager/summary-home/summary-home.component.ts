import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Summary } from '../../../../../models/summary';
import { SummaryServiceService } from '../../../../../service/summary-service.service';
import { User } from '../../../../../models/user';
import { StudentService } from '../../../../../service/student.service';

@Component({
  selector: 'app-summary-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './summary-home.component.html',
  styleUrl: './summary-home.component.css'
})
export class SummaryHomeComponent implements OnInit{
  summaries!:Summary[]
  student:User={} as User
  bool:boolean=false;
  message:string='';
constructor(
  private summary_service:SummaryServiceService,
    private student_service:StudentService

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST
      }
    })
    this.summary_service.getSummaryByStudentId(this.student).subscribe((R)=>{
      if(R){
        this.summaries=R
      }
    })
  }
    DeleteSummary(review:Summary){
        if(confirm("sure this delete")){
          this.summary_service.DeleteSummary(review).subscribe((value)=>{
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
      clickSummary(id:string){
        this.summary_service.clickSummary(id)
      }
}
