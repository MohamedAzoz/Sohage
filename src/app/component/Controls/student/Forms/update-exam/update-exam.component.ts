import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../../../../models/exam';
import { SubjectInface } from '../../../../../models/subject_inface';
import { ExamServiceService } from '../../../../../service/exam-service.service';
import { StudentService } from '../../../../../service/student.service';
import { SubjectServiceService } from '../../../../../service/subject-service.service';

@Component({
  selector: 'app-update-exam',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-exam.component.html',
  styleUrl: './update-exam.component.css'
})
export class UpdateExamComponent implements OnInit{
  exam:Exam={} as Exam;
  exams:Exam[]=[] as Exam[]
  subjects!:SubjectInface[]|null
  message!:string;
  bool:boolean=false;
  bool2:boolean=false;
 constructor(
  private exam_service:ExamServiceService,
  private subject_service:SubjectServiceService,
  private student_service:StudentService
  ,private location:Location
 ){}
  ngOnInit(): void {
this.exam_service.currentExam.subscribe((data)=>{
  if(data){
    this.exam=data;
  }
})
    }
    back(){
      this.location.back();
    }



onSubmit(exam:Exam){
    this.exam_service.updateExam(exam).subscribe((Value)=>{
      if(Value){
        this.message="been Your Update successfully";
        this.bool=true;
      }else{
        this.message="error in Update";
        this.bool=false;
      }
    })
}
}
