import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../models/department';
import { College } from '../../../../models/college';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-delete-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-delete-department.component.html',
  styleUrl: './form-delete-department.component.css'
})
export class FormDeleteDepartmentComponent implements OnInit{
  depart:Department={} as Department
  colleges:College[]=[] as College[]
  departments:Department[]=[] as Department[]
  message!:string;
  collegeid:string='';
  bool:boolean=false;
select:boolean=false;
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
              this.select=true;
            }else{
              this.departments=[];
              this.select=false;
            }
          })
      }

      DeleteDepartment(department:Department){
    if(confirm("sure this delete")){
      this.college_service.DeleteDepartment(department).subscribe((value)=>{
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


