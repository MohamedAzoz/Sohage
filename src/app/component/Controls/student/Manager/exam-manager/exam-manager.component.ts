import { Component, OnInit } from '@angular/core';
import { ExamFormComponent } from '../../Forms/exam-form/exam-form.component';
import { ExamServiceService } from '../../../../../service/exam-service.service';
import { Exam } from '../../../../../models/exam';
import { StudentService } from '../../../../../service/student.service';
import { User } from '../../../../../models/user';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-exam-manager',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './exam-manager.component.html',
  styleUrl: './exam-manager.component.css'
})
export class ExamManagerComponent implements OnInit{
  exams:Exam[]=[] as Exam[]
  student:User={} as User
constructor(
  private exam_service:ExamServiceService,
    private student_service:StudentService

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST
      }
    })
    this.exam_service.getExamByStudentId(this.student).subscribe((EX)=>{
         this.exams=EX
    })
  }


}
