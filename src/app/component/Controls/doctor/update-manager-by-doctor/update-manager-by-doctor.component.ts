import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../../../service/doctor.service';
import { ExamServiceService } from '../../../../service/exam-service.service';
import { DoctorData } from '../../../../models/doctor-data';
import { User } from '../../../../models/user';
import { Year } from '../../../../models/year';
import { College } from '../../../../models/college';
import { Department } from '../../../../models/department';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { SubjectInface } from '../../../../models/subject_inface';
import { SubjectServiceService } from '../../../../service/subject-service.service';
import { Exam } from '../../../../models/exam';
import { Review } from '../../../../models/review';
import { Summary } from '../../../../models/summary';
import { Test } from '../../../../models/test';
import { ReviewService } from '../../../../service/review.service';
import { SummaryServiceService } from '../../../../service/summary-service.service';
import { TestService } from '../../../../service/test.service';

@Component({
  selector: 'app-update-manager-by-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './update-manager-by-doctor.component.html',
  styleUrl: './update-manager-by-doctor.component.css'
})
export class UpdateManagerByDoctorComponent implements OnInit {
  private yearBehavior=new BehaviorSubject<Year[]|undefined>(undefined);
     yearsDotor=this.yearBehavior.asObservable();

     private DepartBehavior=new BehaviorSubject<Department[]|undefined>(undefined);
     DepartsDoctor=this.DepartBehavior.asObservable();

     private collegeBehavior=new BehaviorSubject<College[]|undefined>(undefined);
     collegesDotor=this.collegeBehavior.asObservable();

     private subjectsBehavior=new BehaviorSubject<SubjectInface[]|undefined>(undefined);
        subjectsDotor=this.subjectsBehavior.asObservable();

     private onesubjectBehavior=new BehaviorSubject<SubjectInface|undefined>(undefined);
        onesubject=this.onesubjectBehavior.asObservable();

     private contentBehavior=new BehaviorSubject<string>('');
        ContentObservable=this.contentBehavior.asObservable();

  content:Exam[]|Review[]|Summary[]|Test[]=[];
  userData:User={} as User;
  years:Year[]=[]
  doctor:DoctorData={} as DoctorData;
    college:College={} as College
    subject:SubjectInface={} as SubjectInface
      colleges:College[]=[] as College[]
    departments:Department[]=[] as Department[]
    subjects:SubjectInface[]=[] as SubjectInface[]
     message!:string;
     collegeid:string='';
     Departid:string='';
     Yearid:string='';
     Subjectid:string='';
     contentId:string='';
     typContent:string='';
     bool:boolean=false;
   select:boolean=false;
   select2:boolean=false;
   select3:boolean=false;
constructor(
private subject_service:SubjectServiceService,
private summary_Service:SummaryServiceService,
private test_Service:TestService,
private exam_Service:ExamServiceService,
private review_Service:ReviewService,
private doctor_service:DoctorService,
private location: Location

){}
  ngOnInit(): void {
    this.doctor_service.usercurrent().subscribe((data)=>{
      if(data){
        this.doctor_service.setDoctor(data)
      }
    });
    this.doctor_service.userData.subscribe((data)=>{
      if(data){
        this.doctor_service.getsubjects(data.subjectsId);
        this.doctor_service.getyears(data.yearsId);
        this.doctor_service.getcolleges(data.collegesId);
        this.doctor_service.getDepartments(data.departmentId);
      }
    });
    this.doctor_service.years_dotor.subscribe((year)=>{
      if(year){
        this.yearBehavior.next(year)
      }
    });
    this.doctor_service.Departs_doctor.subscribe((Depart)=>{
      if(Depart){
        this.DepartBehavior.next(Depart)
      }
    });
    this.doctor_service.colleges_dotor.subscribe((college)=>{
      if(college){
        this.collegeBehavior.next(college)
      }
    });
    this.doctor_service.subjects_dotor.subscribe((subject)=>{
      if(subject){
        this.subjectsBehavior.next(subject);
      }
    });
    this.collegesDotor.subscribe((college)=>{
      if(college){
        this.colleges=college
      }
    });
  }
  isEmpty(value:any):boolean{
     if(value.length==0){
      return true;
     }else{
      return false;
     }
  }


selectCollege(id:string){
this.DepartsDoctor.subscribe((depart)=>{
  if(depart){
     this.departments=depart.filter((v)=>(v.collegeId==id));
  }else{
    this.departments=[]
  }
})
}
selectDepartment(id:string){
  this.yearsDotor.subscribe((year)=>{
    if(year){
      this.years=year.filter((v)=>(v.departmentId==id));
   }else{
     this.years=[]
   }

  })
}
selectYear(id:string){
this.subjectsDotor.subscribe((subject)=>{
  if(subject){
    this.subjects=subject.filter((v)=>(v.yearId==id));
 }else{
   this.subjects=[]
 }
})
}
selectSubject(id:string){
this.subjectsDotor.subscribe((Subjects)=>{
  if(Subjects){
   let Subject=Subjects.find((sub)=>(sub.id==id));
   if(Subject){
    this.select=true
    this.onesubjectBehavior.next(Subject)
   }else{
    this.onesubjectBehavior.next(undefined)
    this.select=false
   }
 }
})
}
selectContent(value:string){
  this.onesubject.subscribe((subject)=>{
    if(subject){
      this.typContent=value
      console.log(subject,value);
      // this.contentBehavior.next(value);
      this.subject_service.setContent_Doctor(value,subject)
     this.subject_service.allContent.subscribe((data)=>{
    if(data && data.length>0){
      // console.log(data);
      this.bool=true;
      this.content=data;
    }else{
      this.bool=false;
      this.content=[];
    }
  });
}
  });

}
clickContent(Id:string){
this.subject_service.currentContent.subscribe((cont)=>{
   switch(cont){
    case 'summary':
    this.summary_Service.clickSummary(Id);
    break;
  case 'reviews':
    this.review_Service.clickReview(Id);
   break;
  case 'exams':
   this.exam_Service.clickExam(Id);
   break;
  case 'tests':
  this.test_Service.clickTest(Id);
   break;
   default:
    break;
  }
})
}
back(){
  this.location.back();
}
}
