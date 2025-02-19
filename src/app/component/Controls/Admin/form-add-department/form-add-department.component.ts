import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';

@Component({
  selector: 'app-form-add-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-add-department.component.html',
  styleUrl: './form-add-department.component.css'
})
export class FormAddDepartmentComponent implements OnInit{
  department:Department={} as Department
  selectFile:File|null=null;
  colleges:College[]=[] as College[]
  message!:string;
  bool:boolean=false;

   constructor(
    private college_service:CollegeServiceService,
private location:Location
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

  onSubmit(){
  this.college_service.AddDepartment(this.department).subscribe((R)=>{
    if(R){
      this.message="been Department add successfully";
      this.bool=true;
    }else{
      this.message="error in Add";
      this.bool=false;
    }
  })
  }
  back(){
    this.location.back();
  }
}


