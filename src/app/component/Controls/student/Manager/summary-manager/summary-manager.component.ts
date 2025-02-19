import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SummaryServiceService } from '../../../../../service/summary-service.service';
import { Summary } from '../../../../../models/summary';
import { User } from '../../../../../models/user';
import { StudentService } from '../../../../../service/student.service';

@Component({
  selector: 'app-summary-manager',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './summary-manager.component.html',
  styleUrl: './summary-manager.component.css'
})
export class SummaryManagerComponent implements OnInit{
  summary:Summary[]=[] as Summary[]
  student:User={} as User
constructor(
  private review_service:SummaryServiceService,
  private student_service:StudentService,

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST;
      }
    })
    this.review_service.getSummaryByStudentId(this.student).subscribe((EX)=>{
        this.summary=EX;
    })
  }
}
