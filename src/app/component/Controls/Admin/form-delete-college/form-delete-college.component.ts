import { Component, OnInit } from '@angular/core';
import { CollegeServiceService } from '../../../../service/college-service.service';
import { College } from '../../../../models/college';

@Component({
  selector: 'app-form-delete-college',
  standalone: true,
  imports: [],
  templateUrl: './form-delete-college.component.html',
  styleUrl: './form-delete-college.component.css'
})
export class FormDeleteCollegeComponent implements OnInit{
  colleges:College[]=[];
  bool:boolean=false;
  message:string='';
constructor(
      private college_service:CollegeServiceService,

){
}
  ngOnInit(): void {
     this.college_service.getColleges().subscribe((data)=>{
      this.colleges=data;
     })
  }
  DeleteCollege(college:College){
    if(confirm("sure this delete")){
      this.college_service.DeleteCollege(college).subscribe((value)=>{
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
