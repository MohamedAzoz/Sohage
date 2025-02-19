import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { Year } from '../../../../models/year';
import { CollegeServiceService } from '../../../../service/college-service.service';

@Component({
  selector: 'app-form-delete-year',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-delete-year.component.html',
  styleUrl: './form-delete-year.component.css'
})
export class FormDeleteYearComponent implements OnInit{
  year:Year={} as Year
  depart:Department={} as Department
  colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  yeats:Year[]=[] as Year[]
  message!:string;
  collegeid:string='';
  Departmentid:string='';
  bool:boolean=false;
select1:boolean=false;
select2:boolean=false;
   constructor(
    private college_service:CollegeServiceService,
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

      DeleteYear(year:Year){
    if(confirm("sure this delete")){
      this.college_service.DeleteYear(year).subscribe((value)=>{
          if(value){
            this.message="been Your Delete successfully";
            this.bool=true;
          }else{
            this.message="error in Delete";
            this.bool=false;
          }
        })
      }
      }
}


