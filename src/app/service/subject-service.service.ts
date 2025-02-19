import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { SubjectInface } from '../models/subject_inface';
import { Year } from '../models/year';
import { BehaviorSubject } from 'rxjs';
import { CollegeServiceService } from './college-service.service';
import { ActivatedRoute } from '@angular/router';
import { SummaryServiceService } from './summary-service.service';
import { TestService } from './test.service';
import { ExamServiceService } from './exam-service.service';
import { ReviewService } from './review.service';
import { Exam } from '../models/exam';
import { Review } from '../models/review';
import { Summary } from '../models/summary';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {
  header={}
private yearBehaviorSubject=new BehaviorSubject<Year|null>(null);
 currentYear:Observable<Year|null>=this.yearBehaviorSubject.asObservable();

private SubjectBehaviorSubject=new BehaviorSubject<SubjectInface|null>(null);
 currentSubject:Observable<SubjectInface|null>=this.SubjectBehaviorSubject.asObservable();
private SubjectBehaviors=new BehaviorSubject<SubjectInface[]|null>(null);
 currentSubs:Observable<SubjectInface[]|null>=this.SubjectBehaviors.asObservable();

private contentBehaviorSubject=new BehaviorSubject<string>('');
 currentContent:Observable<string>=this.contentBehaviorSubject.asObservable();

private boolenBehaviorSubject=new BehaviorSubject<boolean>(false);
 currentbool:Observable<boolean>=this.boolenBehaviorSubject.asObservable();

 private allContentBehavior=new BehaviorSubject<Summary[]|Exam[]|Test[]|Review[]|null>(null);
 allContent:Observable<Summary[]|Exam[]|Test[]|Review[]|null>=this.allContentBehavior.asObservable();

 private SubjectInfaceBehavior=new BehaviorSubject<SubjectInface[]|undefined>(undefined);
    subject_dotor=this.SubjectInfaceBehavior.asObservable();


  constructor(
    private http:HttpClient,
    private college_Service:CollegeServiceService,
    private summary_Service:SummaryServiceService,
    private test_Service:TestService,
    private exam_Service:ExamServiceService,
    private review_Service:ReviewService,
    ) {
    this.header={Headers:new HttpHeaders({
          "Content-type":"application/json"
        })}
   }

   getSubjects(id:string):Observable<SubjectInface[]>{
      return this.http.get<SubjectInface[]>(`${environment.apiUrl}/subject?yearId=${id}`,this.header);
    }
    getSubject_Doctor():Observable<SubjectInface[]>{
      return this.http.get<SubjectInface[]>(`${environment.apiUrl}/subject`,this.header);
    }
   getSubjectone(id:string):Observable<SubjectInface>{
      return this.http.get<SubjectInface>(`${environment.apiUrl}/subject/${id}`,this.header);
    }
    AddSubject(subject:SubjectInface):Observable<SubjectInface>{
      return this.http.post<SubjectInface>(`${environment.apiUrl}/subject`,subject,this.header);
    }
    DeleteSubject(subject:SubjectInface):Observable<SubjectInface>{
      return this.http.delete<SubjectInface>(`${environment.apiUrl}/subject/${subject.id}`,this.header);
    }
    updateSubject(subject:SubjectInface):Observable<SubjectInface>{
      return this.http.patch<SubjectInface>(`${environment.apiUrl}/subject/${subject.id}`,subject,this.header);
    }

    setData(year:Year){
     this.college_Service.currentDepartment.subscribe((v)=>{
        let x= v?.id
        if(year.departmentId==x){

          this.yearBehaviorSubject.next(year);
        }else{
            this.yearBehaviorSubject.next(null)
        }
      })
    }

      getData(){
      return this.yearBehaviorSubject.value;
    }

    setSubject(subject:SubjectInface,value:boolean){
      this.currentYear.subscribe((v)=>{
         if(subject.yearId==v?.id){
          this.boolenBehaviorSubject.next(value)
           this.SubjectBehaviorSubject.next(subject);
         }else{
          this.boolenBehaviorSubject.next(false)
             this.SubjectBehaviorSubject.next(null)
         }
       })
     }
   get getSubject(){
       return this.SubjectBehaviorSubject.value;
     }
   get getBoolen(){
       return this.boolenBehaviorSubject.value;
     }

     setContent(value:string,subject:SubjectInface){
     let currentOb:Observable<any>;
      this.currentSubject.subscribe((x)=>{
        if(x==subject){
           this.contentBehaviorSubject.next(value);
           switch(value){
             case 'summary':
             currentOb=this.summary_Service.getSummary(subject);
             break;
           case 'reviews':
            currentOb= this.review_Service.getReview(subject)
            break;
           case 'exams':
            currentOb= this.exam_Service.getExam(subject)
            break;
           case 'tests':
            currentOb=this.test_Service.getTest(subject);
            break;
           default:
             this.allContentBehavior.next(null);
             break;
           }
           currentOb.subscribe((content)=>{
            this.allContentBehavior.next(content);
            console.log(content);

           })
         }else{
           console.log("error in set content");
           this.contentBehaviorSubject.next('');

           this.allContentBehavior.next(null);
         }
      })
     }
     setContent_Doctor(value:string,subject:SubjectInface){
     let currentOb:Observable<any>=new Observable;
        if(subject){
           this.contentBehaviorSubject.next(value);
           switch(value){
             case 'summary':
             currentOb=this.summary_Service.getSummary(subject);
             break;
           case 'reviews':
            currentOb= this.review_Service.getReview(subject)
            break;
           case 'exams':
            currentOb= this.exam_Service.getExam(subject)
            break;
           case 'tests':
            currentOb=this.test_Service.getTest(subject);
            break;
           default:
             this.allContentBehavior.next(null);
             break;
           }
           currentOb.subscribe((content)=>{
            this.allContentBehavior.next(content);

           })
         }else{
           console.log("error in set content");
           this.contentBehaviorSubject.next('');

           this.allContentBehavior.next(null);
         }
     }
   get getContent(){
       return this.contentBehaviorSubject.value;
     }


     //=======================
     setSubs(yearid:string){
  this.getSubjects(yearid).subscribe((data)=>{
    this.SubjectBehaviors.next(data);
  })
     }


}
