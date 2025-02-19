import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectInface } from '../../../../../models/subject_inface';
import { Summary } from '../../../../../models/summary';
import { StudentService } from '../../../../../service/student.service';
import { SummaryServiceService } from '../../../../../service/summary-service.service';

@Component({
  selector: 'app-update-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-summary.component.html',
  styleUrl: './update-summary.component.css'
})
export class UpdateSummaryComponent implements OnInit{
  summary:Summary={} as Summary;
  summarys:Summary[]=[] as Summary[]
  selectFile:File|null=null;
  subjects!:SubjectInface[]|null
  message!:string;
  bool:boolean=false;
  bool2:boolean=false;
 constructor(
  private http:HttpClient,
  private summary_service:SummaryServiceService,
  // private subject_service:SubjectServiceService,
  private student_service:StudentService,
  private location:Location

 ){}
  ngOnInit(): void {
this.summary_service.currentSummary.subscribe((data)=>{
  if(data){
    this.summary=data;
  }
})
    }
    back(){
      this.location.back();
    }
onSubmit(summary:Summary){
    this.summary_service.updateSummary(summary).subscribe((Value)=>{
      if(Value){
        this.message="been Your Update successfully";
        this.bool=true;
      }else{
        this.message="error in Update";
        this.bool2=true;
      }
    })
}
}
