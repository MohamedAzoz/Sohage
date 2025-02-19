import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SubjectInface } from '../models/subject_inface';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {
   private test=new BehaviorSubject<Test|undefined>(undefined);
    public currentTest=this.test.asObservable()
header={}

  constructor(
    private http:HttpClient    ) {
      this.header={Headers:new HttpHeaders({
        "Content-type":"application/json"
        ,'X-Access-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
      })}
   }

   getTests():Observable<Test[]>{
      return this.http.get<Test[]>(`${environment.jsonBinApiUrl}/test`,this.header);
    }
   getTest(subject:SubjectInface):Observable<Test[]>{
      return this.http.get<Test[]>(`${environment.jsonBinApiUrl}/test?subjectId=${subject.id}`,this.header);
    }
     getTestByStudentId(student:User):Observable<Test[]>{
              return this.http.get<Test[]>(`${environment.jsonBinApiUrl}/test?uploadedBy=${student.id}`,this.header);
            }
    AddTest(test:Test):Observable<Test>{
      return this.http.post<Test>(`${environment.jsonBinApiUrl}/test`,test,this.header);
    }
    DeleteTest(test:Test):Observable<Test>{
      return this.http.delete<Test>(`${environment.jsonBinApiUrl}/test/${test.id}`,this.header)
    }
    updateTest(test:Test):Observable<Test>{
      return this.http.patch<Test>(`${environment.jsonBinApiUrl}/test/${test.id}`,test,this.header);
    }


    clickTest(id:string){
      this.getTests().subscribe((data)=>{
        let chick=data.find((data)=>(data.id==id))
        if(chick){
          this.test.next(chick);
        }else{
          this.test.next(undefined);
        }
      })
    }
}
