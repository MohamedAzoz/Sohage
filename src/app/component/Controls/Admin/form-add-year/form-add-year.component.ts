import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { Year } from '../../../../models/year';

@Component({
  selector: 'app-form-add-year',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-add-year.component.html',
  styleUrl: './form-add-year.component.css'
})
export class FormAddYearComponent implements OnInit{
  year:Year={} as Year
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

  onSubmit(year:Year){
  this.college_service.AddYear(year).subscribe((R)=>{
    if(R){
      this.message="been Year add successfully";
      this.bool=true;
    }else{
      this.message="error in Add";
      this.bool=false;
    }
  })
  }
}


