import { Component, OnInit } from '@angular/core';
import { SubjectServiceService } from '../../service/subject-service.service';
import { SubjectInface } from '../../models/subject_inface';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {
  subjects!:SubjectInface[]|null
  name!:string;
  constructor(
    private subject_Service:SubjectServiceService
  ){

  }
  ngOnInit(): void {
    // this.name=this.subject_Service.getData()?.name
    this.subject_Service.currentYear.subscribe((year)=>{
      if(year){
        this.name=year.name
    this.subject_Service.getSubjects(year.id).subscribe((Y)=>{
      this.subjects=Y
    })
  }else{
    this.subjects=null
    console.log("Error in get subjects");
  }
    })
  }
  isempty():boolean{
    return (this.subjects?.length==0)?true:false;
  }
  setSubject(subject:SubjectInface){
    console.log(subject.name);
     this.subject_Service.setSubject(subject,true)
  }
}
