import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StudentData } from '../models/student-data';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private isStudent = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | undefined>(undefined);
  private studentData = new BehaviorSubject<StudentData | undefined>(undefined);
  userData = this.studentData.asObservable();

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private userService: UserServiceService,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setDataUser(user: StudentData): Observable<StudentData> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<StudentData>(`${environment.apiUrl}/student_data`, user, this.headers).pipe(
        catchError(error => {
          console.error('Error setting user data:', error);
          return of(user); // تجنب انهيار التطبيق عند الفشل
        })
      );
    } else {
      return of(user);
    }
  }

  getDataUsers(): Observable<StudentData[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<StudentData[]>(`${environment.apiUrl}/student_data`).pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]); // إعادة قائمة فارغة بدلاً من انهيار التطبيق
        })
      );
    } else {
      return of([]);
    }
  }

  getDataUser(id: string): Observable<StudentData> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<StudentData>(`${environment.apiUrl}/student_data/${id}`).pipe(
        catchError(error => {
          console.error(`Error fetching user with ID ${id}:`, error);
          return of(undefined as any);
        })
      );
    } else {
      return of(undefined as any);
    }
  }

  deleteDataUser(users: StudentData): Observable<StudentData> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<StudentData>(`${environment.apiUrl}/student_data/${users.id}`, this.headers).pipe(
        catchError(error => {
          console.error('Error deleting user:', error);
          return of(users);
        })
      );
    } else {
      return of(users);
    }
  }

  updateDataUser(users: StudentData): Observable<StudentData> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.patch<StudentData>(`${environment.apiUrl}/student_data/${users.id}`, users, this.headers).pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          return of(users);
        })
      );
    } else {
      return of(users);
    }
  }

  checkStudent(username: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUsers().subscribe(users => {
        let userRole = users.find(user => user.username === username && user.role === 'student');
        if (userRole) {
          this.isStudent.next(true);
          this.user.next(userRole);
        } else {
          this.isStudent.next(false);
        }
      });
    }
  }

  isbool(): Observable<boolean> {
    return this.isStudent.asObservable();
  }

  user_student(): boolean {
    return this.isStudent.value;
  }

  usercurrent(): Observable<User | undefined> {
    return this.user.asObservable();
  }

  setuser(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      this.getDataUsers().subscribe(data => {
        let us = data.find(v => v.studentId === user.id);
        if (us) {
          this.studentData.next(us);
        } else {
          this.studentData.next(undefined);
        }
      });
    }
  }
}
