import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { CollegeServiceService } from '../../../../service/college-service.service';

@Component({
  selector: 'app-form-update-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-update-department.component.html',
  styleUrl: './form-update-department.component.css'
})
export class FormUpdateDepartmentComponent implements OnInit{
    college:College={} as College
    colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  department:Department={} as Department;
   message!:string;
   collegeid:string='';
   Departid:string='';
   Yearid:string='';
   bool:boolean=false;
 select:boolean=false;
 select2:boolean=false;
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
        this.college_service.getDepartmentone(id).subscribe((data)=>{
          if(data){
            this.department=data;
            this.select2=true;
          }else{
            this.select2=false;
          }
        })
    }

  onSubmit(depart:Department){
  this.college_service.updateDepartment(depart).subscribe((Y)=>{
    if(Y){
      this.message="been Department update successfully";
      this.bool=true;
    }else{
      this.message="error";
      this.bool=false;
    }
  })
  }
}




