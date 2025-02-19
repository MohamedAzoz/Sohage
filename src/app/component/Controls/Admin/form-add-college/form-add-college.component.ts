import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../models/college';
import { CollegeServiceService } from '../../../../service/college-service.service';

@Component({
  selector: 'app-form-add-college',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-add-college.component.html',
  styleUrl: './form-add-college.component.css'
})
export class FormAddCollegeComponent implements OnInit{
  college:College={} as College
  selectFile:File|null=null;
  message!:string;
  bool:boolean=false;

   constructor(
    private college_service:CollegeServiceService,
   ){

   }
    ngOnInit(): void {
      }

  onSubmit(){
  this.college_service.AddCollege(this.college).subscribe((R)=>{
    if(R){
      this.message="been College add successfully";
      this.bool=true;
    }else{
      this.message="error in Add";
      this.bool=false;
    }
  })
  }
}
