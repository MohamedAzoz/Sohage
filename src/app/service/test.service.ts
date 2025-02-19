import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Test } from '../models/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SubjectInface } from '../models/subject_inface';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private test = new BehaviorSubject<Test | undefined>(undefined);
  public currentTest = this.test.asObservable();

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getTests(): Observable<Test[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Test[]>(`${environment.apiUrl}/test`, this.headers).pipe(
        catchError(error => {
          console.error('Error fetching tests:', error);
          return of([]);
        })
      );
    }
    return of([]);
  }

  getTest(subject: SubjectInface): Observable<Test[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Test[]>(`${environment.apiUrl}/test?subjectId=${subject.id}`, this.headers).pipe(
        catchError(error => {
          console.error('Error fetching tests by subject:', error);
          return of([]);
        })
      );
    }
    return of([]);
  }

  getTestByStudentId(student: User): Observable<Test[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Test[]>(`${environment.apiUrl}/test?uploadedBy=${student.id}`, this.headers).pipe(
        catchError(error => {
          console.error('Error fetching tests by student:', error);
          return of([]);
        })
      );
    }
    return of([]);
  }

  AddTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${environment.apiUrl}/test`, test, this.headers).pipe(
      catchError(error => {
        console.error('Error adding test:', error);
        return of(test);
      })
    );
  }

  DeleteTest(test: Test): Observable<Test> {
    return this.http.delete<Test>(`${environment.apiUrl}/test/${test.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error deleting test:', error);
        return of(test);
      })
    );
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.patch<Test>(`${environment.apiUrl}/test/${test.id}`, test, this.headers).pipe(
      catchError(error => {
        console.error('Error updating test:', error);
        return of(test);
      })
    );
  }

  clickTest(id: string) {
    this.getTests().subscribe((data) => {
      const foundTest = data.find((test) => test.id === id);
      this.test.next(foundTest ?? undefined);
    });
  }
}
