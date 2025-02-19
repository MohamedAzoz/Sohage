import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Exam } from '../models/exam';
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
export class ExamServiceService {
  private exam = new BehaviorSubject<Exam | undefined>(undefined);
  public currentExam = this.exam.asObservable();
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getExams(): Observable<Exam[]> {
    if (!this.isBrowser()) return of([]); // منع SSR من تحميل البيانات
    return this.http.get<Exam[]>(`${environment.apiUrl}/exam/`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error fetching exams:', error);
        return of([]);
      })
    );
  }

  getExam(subject: SubjectInface): Observable<Exam[]> {
    if (!this.isBrowser()) return of([]);
    return this.http.get<Exam[]>(`${environment.apiUrl}/exam?subjectId=${subject.id}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error fetching exam by subject:', error);
        return of([]);
      })
    );
  }

  getExamByStudentId(student: User): Observable<Exam[]> {
    if (!this.isBrowser()) return of([]);
    return this.http.get<Exam[]>(`${environment.apiUrl}/exam?uploadedBy=${student.id}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error fetching exam by student ID:', error);
        return of([]);
      })
    );
  }

  AddExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${environment.apiUrl}/exam`, exam, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error adding exam:', error);
        return of(exam);
      })
    );
  }

  DeleteExam(exam: Exam): Observable<Exam> {
    return this.http.delete<Exam>(`${environment.apiUrl}/exam/${exam.id}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error deleting exam:', error);
        return of(exam);
      })
    );
  }

  updateExam(exam: Exam): Observable<Exam> {
    return this.http.patch<Exam>(`${environment.apiUrl}/exam/${exam.id}`, exam, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error updating exam:', error);
        return of(exam);
      })
    );
  }

  clickExam(id: string) {
    this.getExams().subscribe((data) => {
      let foundExam = data.find((exam) => exam.id === id);
      this.exam.next(foundExam ?? undefined);
    });
  }
}
