import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Notification } from '../models/notification';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SubjectServiceService } from './subject-service.service';
import { CollegeServiceService } from './college-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  private NotificationBehavior = new BehaviorSubject<Notification[] | undefined>(undefined);
  getNotification = this.NotificationBehavior.asObservable();

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private subject_service: SubjectServiceService,
    private http: HttpClient,
    private collge_service: CollegeServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get_All_Notification(): Observable<Notification[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Notification[]>(`${environment.apiUrl}/notification`, this.headers).pipe(
        catchError(error => {
          console.error('Error fetching notifications:', error);
          return of([]); // إرجاع قائمة فارغة في حال حدوث خطأ
        })
      );
    } else {
      return of([]); // في بيئة SSR، لا نحاول جلب البيانات
    }
  }

  Add_New_Notification(notification: Notification): Observable<Notification> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<Notification>(`${environment.apiUrl}/notification`, notification, this.headers).pipe(
        catchError(error => {
          console.error('Error adding notification:', error);
          return of(notification); // إرجاع الإشعار لمنع الخطأ
        })
      );
    } else {
      return of(notification);
    }
  }

  DeleteNotification(notification: Notification): Observable<Notification> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<Notification>(`${environment.apiUrl}/notification/${notification.id}`, this.headers).pipe(
        catchError(error => {
          console.error('Error deleting notification:', error);
          return of(notification); // منع التطبيق من الانهيار
        })
      );
    } else {
      return of(notification);
    }
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
          id: subjectId + URL_Content + StudentYear + type,
          type: type,
          subjectName: subjectName,
          StudentName: StudentName,
          StudentCollege: StudentCollege,
          StudentYear: StudentYear,
          URL_Content: URL_Content,
          show: false,
          time: new Date()
        };

        this.Add_New_Notification(oneNotification).subscribe(() => {
          console.log(`Notification added: ${oneNotification.subjectName}`);
        });
      } else {
        console.log('Error in Notification');
      }
    });
  }
}
