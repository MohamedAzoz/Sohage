import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../../../models/exam';
import { User } from '../../../../../models/user';
import { ExamServiceService } from '../../../../../service/exam-service.service';
import { StudentService } from '../../../../../service/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exam-home.component.html',
  styleUrl: './exam-home.component.css'
})
export class ExamHomeComponent implements OnInit{
  exams!:Exam[]
  bool:boolean=false;
  message:string='';
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
    });
    this.exam_service.getExamByStudentId(this.student).subscribe((EX)=>{
      if(EX){
        this.exams=EX
      }
    });
  }

  DeleteExam(exam:Exam){
    if(confirm("sure this delete")){
      this.exam_service.DeleteExam(exam).subscribe((value)=>{
        if(value){
          this.message="been Your Delete successfully";
          this.bool=true;
        }else{
          this.message="error in Delete";
          this.bool=false;
        }
      });
    }
  }
    clickExam(id:string){
      this.exam_service.clickExam(id)
    }
}
