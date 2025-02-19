import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { Year } from '../../../../models/year';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { SubjectInface } from '../../../../models/subject_inface';
import { SubjectServiceService } from '../../../../service/subject-service.service';

@Component({
  selector: 'app-form-delete-subject',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-delete-subject.component.html',
  styleUrl: './form-delete-subject.component.css'
})
export class FormDeleteSubjectComponent implements OnInit{
  subject:SubjectInface={} as SubjectInface
  depart:Department={} as Department
  colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  yeats:Year[]=[] as Year[]
  subjects:SubjectInface[]=[] as SubjectInface[];
  message!:string;
  collegeid:string='';
  Departmentid:string='';
  Yearid:string='';
  bool:boolean=false;
  select1:boolean=false;
  select2:boolean=false;
  select3:boolean=false;
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
            this.yeats=data;
            this.select2=true;
          }else{
            this.yeats=[];
            this.select2=false;
          }
        })
    }
      selectYear(id:string){
        this.subject_service.getSubjects(id).subscribe((data)=>{
          if(data){
            this.subjects=data;
            this.select3=true;
          }else{
            this.subjects=[];
            this.select3=false;
          }
        })
    }

      DeleteSubject(subject:SubjectInface){
    if(confirm("sure this delete")){
      this.subject_service.DeleteSubject(subject).subscribe((value)=>{
          if(value){
            this.message="been Subject Delete successfully";
            this.bool=true;
          }else{
            this.message="error in Delete";
            this.bool=false;
          }
        })
      }
      }
}


