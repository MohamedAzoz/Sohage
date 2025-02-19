import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectInface } from '../../../../models/subject_inface';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { Year } from '../../../../models/year';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { SubjectServiceService } from '../../../../service/subject-service.service';

@Component({
  selector: 'app-form-update-subject',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-update-subject.component.html',
  styleUrl: './form-update-subject.component.css'
})
export class FormUpdateSubjectComponent implements OnInit{
  subject:SubjectInface={}as SubjectInface
  subjects:SubjectInface[]=[] as SubjectInface[]
  years:Year[]=[] as Year[]
  colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  message!:string;
  collegeid:string='';
  Departmentid:string='';
  Yearid:string='';
  Subjectid:string='';
  bool:boolean=false;
select1:boolean=false;
select2:boolean=false;
select3:boolean=false;
select4:boolean=false;
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
          });
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
          });
      }
      selectSubject(id:string){
          this.subject_service.getSubjectone(id).subscribe((data)=>{
            if(data){
              this.subject=data;
              this.select4=true;
            }else{
              this.select4=false;
            }
          });
      }

  onSubmit(subject:SubjectInface){
  this.subject_service.updateSubject(subject).subscribe((R)=>{
    if(R){
      this.message="been Your Update successfully";
      this.bool=true;
    }else{
      this.message="error in Add";
      this.bool=false;
    }
  })
  }
}


