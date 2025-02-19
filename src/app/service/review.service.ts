import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SubjectInface } from '../models/subject_inface';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
private review=new BehaviorSubject<Review|undefined>(undefined);
public currentReview=this.review.asObservable();

header={}

  constructor(
    private http:HttpClient    ) {
      this.header={Headers:new HttpHeaders({
        "Content-type":"application/json"
        ,'X-Master-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
      })}
   }
   getReviews():Observable<Review[]>{
      return this.http.get<Review[]>(`${environment.jsonBinApiUrl}/review`,this.header);
    }
   getReview(subject:SubjectInface):Observable<Review[]>{
      return this.http.get<Review[]>(`${environment.jsonBinApiUrl}/review?subjectId=${subject.id}`,this.header);
    }
     getReviewByStudentId(student:User):Observable<Review[]>{
          return this.http.get<Review[]>(`${environment.jsonBinApiUrl}/review?uploadedBy=${student.id}`,this.header);
        }
    AddReview(review:Review):Observable<Review>{
      return this.http.post<Review>(`${environment.jsonBinApiUrl}/review`,review,this.header);
    }
    DeleteReview(review:Review):Observable<Review>{
      return this.http.delete<Review>(`${environment.jsonBinApiUrl}/review/${review.id}`,this.header)
    }
    updateReview (review:Review):Observable<Review>{
      return this.http.patch<Review>(`${environment.jsonBinApiUrl}/review/${review.id}`,review,this.header);
    }
    clickReview(id:string){
      this.getReviews().subscribe((data)=>{
        let chick=data.find((data)=>(data.id==id))
        if(chick){
          this.review.next(chick);
        }else{
          this.review.next(undefined);
        }
      })
    }
}
