import { Component, OnInit } from '@angular/core';
import { CollegeServiceService } from '../../service/college-service.service';
import { Department } from '../../models/department';
import { College } from '../../models/college';
import { ActivatedRoute } from '@angular/router';
import { SubjectComponent } from '../subject/subject.component';
import { YearComponentimplements } from "../year/year.component";
import { SubjectContentComponent } from "../subject-content/subject-content.component";
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-college',
  standalone: true,
  imports: [SubjectComponent, YearComponentimplements, SubjectContentComponent,ContentComponent],
  templateUrl: './college.component.html',
  styleUrl: './college.component.css'
})
export class CollegeComponent implements OnInit {
  departments!:Department[];
  college!:College;
  constructor(
    private college_Service:CollegeServiceService,
    private acriva:ActivatedRoute
  ){

  }
  ngOnInit(): void {
   this.acriva.paramMap.subscribe((v)=>{
    const Id=v.get('id')
if(Id){
    console.log(Id)
    this.college_Service.getDepartments(Id).subscribe((Depart)=>{
       this.departments= Depart
    });

    this.college_Service.getCollege(Id).subscribe((V)=>{
      this.college=V
    });
  }else{
    console.log("============ error code  =============");
  }
   });



  }

  setDepartment(depart:Department){
    this.college_Service.setDepartment(depart)
    console.log("secsse");

  }

}
