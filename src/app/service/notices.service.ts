import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { BehaviorSubject, map, Observable, ReplaySubject, switchMap } from 'rxjs';
import { SubjectServiceService } from './subject-service.service';
import { CollegeServiceService } from './college-service.service';
import { Department } from '../models/department';
import { Year } from '../models/year';
import { College } from '../models/college';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class NoticesService {
  private NotificationBehavior=new BehaviorSubject<Notification[]|undefined>(undefined);
  getNotification=this.NotificationBehavior.asObservable();
  header={}
  constructor(
    private subject_service:SubjectServiceService,
       private http:HttpClient,
       private collge_service:CollegeServiceService
  ) {
    this.header={Headers:new HttpHeaders({
      "Content-type":"application/json"
      ,'X-Access-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
    })}
  }

get_All_Notification():Observable<Notification[]>{
  return this.http.get<Notification[]>(`${environment.jsonBinApiUrl}/notification`,this.header);
}
Add_New_Notification(notification:Notification):Observable<Notification>{
  return this.http.post<Notification>(`${environment.jsonBinApiUrl}/notification`,notification,this.header);
}
DeleteNotification(notification:Notification):Observable<Notification>{
   return this.http.delete<Notification>(`${environment.jsonBinApiUrl}/notification/${notification.id}`,this.header);
}
AddNotification(type: string, subjectId: string, StudentName: string, URL_Content: string) {
  this.subject_service.getSubjectone(subjectId).pipe(
    switchMap(subject => {
      let subjectName = subject.name;
      return this.collge_service.getYear(subject.yearId).pipe(
        map(year => ({ subjectName, year }))
      );
    }),
    switchMap(({ subjectName, year }) => {
      let StudentYear = year.name;
      return this.collge_service.getDepartmentone(year.departmentId).pipe(
        map(department => ({ subjectName, StudentYear, department }))
      );
    }),
    switchMap(({ subjectName, StudentYear, department }) => {
      return this.collge_service.getCollege(department.collegeId).pipe(
        map(college => ({ subjectName, StudentYear, StudentCollege: college.name }))
      );
    })
  ).subscribe(({ subjectName, StudentYear, StudentCollege }) => {
    if (subjectName && StudentCollege && StudentName) {
      const oneNotification: Notification = {
        'id':subjectId+URL_Content+StudentYear+type,
        'type': type,
        'subjectName': subjectName,
        'StudentName': StudentName,
        'StudentCollege': StudentCollege,
        'StudentYear': StudentYear,
        'URL_Content': URL_Content,
        'show': false,
        'time': new Date()
      };
      // this.notices.unshift(oneNotification);
      // this.NotificationBehavior.next([...this.notices]);
      this.Add_New_Notification(oneNotification).subscribe(() => {
        console.log(`Notification added: ${oneNotification.subjectName}`);
      });
    } else {
      console.log("Error in Notification");
    }
  });
}

}
