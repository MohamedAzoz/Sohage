import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectInface } from '../../../../models/subject_inface';
import { SubjectServiceService } from '../../../../service/subject-service.service';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { Department } from '../../../../models/department';
import { College } from '../../../../models/college';
import { Year } from '../../../../models/year';

@Component({
  selector: 'app-form-subject',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-subject.component.html',
  styleUrl: './form-subject.component.css'
})
export class FormSubjectComponent implements OnInit{
  subject:SubjectInface={}as SubjectInface
  years:Year[]=[] as Year[]
  colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  message!:string;
  collegeid:string='';
  Departmentid:string='';
  bool:boolean=false;
select1:boolean=false;
select2:boolean=false;
   constructor(
    private college_service:CollegeServiceService,
    private subject_service:SubjectServiceService
   ){

   }
    ngOnInit(): void {

          this.college_service.getColleges().subscribe((data)=>{
                      if(data){
                        this.colleges=data
                      }else{
                        this.colleges=[]
                      }
                  });


      }
      selectCollege(id:string){
          this.college_service.getDepartments(id).subscribe((data)=>{
            if(data){
              this.departments=data;
              this.select1=true;
            }else{
              this.departments=[];
              this.select1=false;
            }
          })

      }
      selectDepartment(id:string){
          this.college_service.getYears(id).subscribe((data)=>{
            if(data){
              this.years=data;
              this.select2=true;
            }else{
              this.years=[];
              this.select2=false;
            }
          })

      }
  onSubmit(){
  this.subject_service.AddSubject(this.subject).subscribe((R)=>{
    if(R){
      this.message="been Your add successfully";
      this.bool=true;
    }else{
      this.message="error in Add";
      this.bool=false;
    }
  })
  }
}


