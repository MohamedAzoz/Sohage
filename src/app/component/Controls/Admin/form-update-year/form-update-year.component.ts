import { Component, OnInit } from '@angular/core';
import { Year } from '../../../../models/year';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-update-year',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-update-year.component.html',
  styleUrl: './form-update-year.component.css'
})
export class FormUpdateYearComponent implements OnInit{
    college:College={} as College
    year:Year={} as Year
    colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  years:Year[]=[]
   message!:string;
   collegeid:string='';
   Departid:string='';
   Yearid:string='';
   bool:boolean=false;
 select:boolean=false;
 select2:boolean=false;
 select3:boolean=false;

   constructor(
        private college_service:CollegeServiceService,
   ){}
    ngOnInit(): void {
      this.college_service.getColleges().subscribe((data)=>{
        if(data){
          this.colleges=data;
        }else{
          this.colleges=[]
        }
    });

      }
      selectCollege(id:string){
        this.college_service.getDepartments(id).subscribe((data)=>{
          if(data){
            this.departments=data;
            this.select=true;
          }else{
            this.select=false;
          }
        })
    }
      selectDepartment(id:string){
        this.college_service.getYears(id).subscribe((data)=>{
          if(data){
            this.years=data;
            this.select2=true;
          }else{
            this.select2=false;
          }
        })
    }
      selectYear(id:string){
        this.college_service.getYear(id).subscribe((data)=>{
          if(data){
            this.year=data;
            this.select3=true;
          }else{
            this.select3=false;
          }
        })
    }

  onSubmit(year:Year){
  this.college_service.updateYear(year).subscribe((Y)=>{
    if(Y){
      this.message="been Year update successfully";
      this.bool=true;
    }else{
      this.message="error";
      this.bool=false;
    }
  })
  }
}



