import { Component, OnInit } from '@angular/core';
import { CollegeServiceService } from '../../service/college-service.service';
import { SubjectServiceService } from '../../service/subject-service.service';
import { Year } from '../../models/year';

@Component({
  selector: 'app-year',
  standalone: true,
  imports: [],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css'
})
export class YearComponentimplements implements OnInit{
  years!:Year[]|null
  name!:string;
  constructor(
        private college_Service:CollegeServiceService,
        private subject_Service:SubjectServiceService,
  ){}
  ngOnInit(): void {
 this.college_Service.currentDepartment.subscribe((Depart)=>{
    if(Depart){
      this.name=Depart.name;
  this.college_Service.getYears(Depart.id).subscribe((Y)=>{
    this.years=Y;
  });
}
});
}

  setData(year:Year){
  this.subject_Service.setData(year)
  }



}
