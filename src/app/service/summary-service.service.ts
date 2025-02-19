import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Summary } from '../models/summary';
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
export class SummaryServiceService {
  private summary = new BehaviorSubject<Summary | undefined>(undefined);
  public currentSummary = this.summary.asObservable();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getSummaries(): Observable<Summary[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Summary[]>(`${environment.apiUrl}/summary`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error fetching summaries:', error);
          return of([]);
        })
      );
    } else {
      return of([]);
    }
  }

  getSummary(subject: SubjectInface): Observable<Summary[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Summary[]>(`${environment.apiUrl}/summary?subjectId=${subject.id}`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error fetching summary by subject:', error);
          return of([]);
        })
      );
    } else {
      return of([]);
    }
  }

  getSummaryByStudentId(student: User): Observable<Summary[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<Summary[]>(`${environment.apiUrl}/summary?uploadedBy=${student.id}`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error fetching summary by student:', error);
          return of([]);
        })
      );
    } else {
      return of([]);
    }
  }

  AddSummary(summary: Summary): Observable<Summary> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<Summary>(`${environment.apiUrl}/summary`, summary, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error adding summary:', error);
          return of(summary);
        })
      );
    } else {
      return of(summary);
    }
  }

  DeleteSummary(summary: Summary): Observable<Summary> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<Summary>(`${environment.apiUrl}/summary/${summary.id}`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error deleting summary:', error);
          return of(summary);
        })
      );
    } else {
      return of(summary);
    }
  }

  updateSummary(summary: Summary): Observable<Summary> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.patch<Summary>(`${environment.apiUrl}/summary/${summary.id}`, summary, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error updating summary:', error);
          return of(summary);
        })
      );
    } else {
      return of(summary);
    }
  }

  clickSummary(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getSummaries().subscribe((data) => {
        const foundSummary = data.find((item) => item.id === id);
        this.summary.next(foundSummary || undefined);
      });
    }
  }
}
