import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectInface } from '../../../../../models/subject_inface';
import { Test } from '../../../../../models/test';
import { StudentService } from '../../../../../service/student.service';
import { TestService } from '../../../../../service/test.service';

@Component({
  selector: 'app-update-test',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.css'
})
export class UpdateTestComponent implements OnInit{
  test:Test={} as Test;
  tests:Test[]=[] as Test[]
  selectFile:File|null=null;
  subjects!:SubjectInface[]|null
  message!:string;
  bool:boolean=false;
  bool2:boolean=false;
 constructor(
  private http:HttpClient,
  private test_service:TestService,
  // private subject_service:SubjectServiceService,
  private student_service:StudentService,
  private location:Location
 ){}
  ngOnInit(): void {
this.test_service.currentTest.subscribe((data)=>{
  if(data){
    this.test=data;
  }
})
    }
    back(){
      this.location.back();
    }
onSubmit(test:Test){
    this.test_service.updateTest(test).subscribe((Value)=>{
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
