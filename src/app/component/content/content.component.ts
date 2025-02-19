import { Component, OnInit } from '@angular/core';
import { SubjectServiceService } from '../../service/subject-service.service';
import { Exam } from '../../models/exam';
import { Review } from '../../models/review';
import { Summary } from '../../models/summary';
import { Test } from '../../models/test';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{
  id!:string|null
  name!:string
  content:Summary[]|Exam[]|Test[]|Review[]|null=null
  constructor(
    private subject_Service:SubjectServiceService,
  ){}
  ngOnInit(): void {
    this.subject_Service.currentContent.subscribe((v)=>{
      if(v){
        this.name=v
      }
    });

this.subject_Service.allContent.subscribe((cont)=>{
  this.content=cont
})

}
isempty():boolean{
  return (this.content?.length==0)?true:false;
}
}
