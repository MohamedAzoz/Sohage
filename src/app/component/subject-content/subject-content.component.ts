import { Component, OnInit } from '@angular/core';
import { SubjectServiceService } from '../../service/subject-service.service';
import { SubjectInface } from '../../models/subject_inface';

@Component({
  selector: 'app-subject-content',
  standalone: true,
  imports: [],
  templateUrl: './subject-content.component.html',
  styleUrl: './subject-content.component.css'
})
export class SubjectContentComponent implements OnInit {
  summarys:string="summary"
  reviews:string="reviews"
  exams:string="exams"
  tests:string="tests"
  name!:string;
  subjectone!:SubjectInface
  constructor(
    private subject_Service:SubjectServiceService,
  ){
  }
  ngOnInit(): void {
    this.subject_Service.currentSubject.subscribe((subject)=>{
      if(subject){
        this.name=subject.name
        this.subjectone=subject
  }
  else{
    console.log("Error in get content subject");
  }
 });
}
  isBoolen():boolean{
      if(this.subject_Service.getBoolen==true){
        return true;
      }else{
        return false;
      }
  }
  setContent(value:string){
    console.log(value);
    if(this.subjectone){
      this.subject_Service.setContent(value,this.subjectone)
    }
  }
}
