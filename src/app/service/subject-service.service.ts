import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { SubjectInface } from '../models/subject_inface';
import { Year } from '../models/year';
import { CollegeServiceService } from './college-service.service';
import { SummaryServiceService } from './summary-service.service';
import { TestService } from './test.service';
import { ExamServiceService } from './exam-service.service';
import { ReviewService } from './review.service';
import { Exam } from '../models/exam';
import { Review } from '../models/review';
import { Summary } from '../models/summary';
import { Test } from '../models/test';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {
  private header = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  private yearBehaviorSubject = new BehaviorSubject<Year | null>(null);
  currentYear: Observable<Year | null> = this.yearBehaviorSubject.asObservable();

  private SubjectBehaviorSubject = new BehaviorSubject<SubjectInface | null>(null);
  currentSubject: Observable<SubjectInface | null> = this.SubjectBehaviorSubject.asObservable();

  private SubjectBehaviors = new BehaviorSubject<SubjectInface[] | null>(null);
  currentSubs: Observable<SubjectInface[] | null> = this.SubjectBehaviors.asObservable();

  private contentBehaviorSubject = new BehaviorSubject<string>('');
  currentContent: Observable<string> = this.contentBehaviorSubject.asObservable();

  private boolenBehaviorSubject = new BehaviorSubject<boolean>(false);
  currentbool: Observable<boolean> = this.boolenBehaviorSubject.asObservable();

  private allContentBehavior = new BehaviorSubject<Summary[] | Exam[] | Test[] | Review[] | null>(null);
  allContent: Observable<Summary[] | Exam[] | Test[] | Review[] | null> = this.allContentBehavior.asObservable();

  private SubjectInfaceBehavior = new BehaviorSubject<SubjectInface[] | undefined>(undefined);
  subject_dotor = this.SubjectInfaceBehavior.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private college_Service: CollegeServiceService,
    private summary_Service: SummaryServiceService,
    private test_Service: TestService,
    private exam_Service: ExamServiceService,
    private review_Service: ReviewService
  ) {}

  getSubjects(id: string): Observable<SubjectInface[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http.get<SubjectInface[]>(`${environment.apiUrl}/subject?yearId=${id}`, this.header)
      .pipe(catchError(error => this.handleError(error, [])));
  }

  getSubject_Doctor(): Observable<SubjectInface[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http.get<SubjectInface[]>(`${environment.apiUrl}/subject`, this.header)
      .pipe(catchError(error => this.handleError(error, [])));
  }

  getSubjectone(id: string): Observable<SubjectInface> {
    if (!isPlatformBrowser(this.platformId)) return of({} as SubjectInface);
    return this.http.get<SubjectInface>(`${environment.apiUrl}/subject/${id}`, this.header)
      .pipe(catchError(error => this.handleError(error, {} as SubjectInface)));
  }

  AddSubject(subject: SubjectInface): Observable<SubjectInface> {
    return this.http.post<SubjectInface>(`${environment.apiUrl}/subject`, subject, this.header)
      .pipe(catchError(error => this.handleError(error, {} as SubjectInface)));
  }

  DeleteSubject(subject: SubjectInface): Observable<SubjectInface> {
    return this.http.delete<SubjectInface>(`${environment.apiUrl}/subject/${subject.id}`, this.header)
      .pipe(catchError(error => this.handleError(error, {} as SubjectInface)));
  }

  updateSubject(subject: SubjectInface): Observable<SubjectInface> {
    return this.http.patch<SubjectInface>(`${environment.apiUrl}/subject/${subject.id}`, subject, this.header)
      .pipe(catchError(error => this.handleError(error, {} as SubjectInface)));
  }

  setData(year: Year) {
    this.college_Service.currentDepartment.subscribe((v) => {
      if (year.departmentId === v?.id) {
        this.yearBehaviorSubject.next(year);
      } else {
        this.yearBehaviorSubject.next(null);
      }
    });
  }

  getData() {
    return this.yearBehaviorSubject.value;
  }

  setSubject(subject: SubjectInface, value: boolean) {
    this.currentYear.subscribe((v) => {
      if (subject.yearId === v?.id) {
        this.boolenBehaviorSubject.next(value);
        this.SubjectBehaviorSubject.next(subject);
      } else {
        this.boolenBehaviorSubject.next(false);
        this.SubjectBehaviorSubject.next(null);
      }
    });
  }

  get getSubject() {
    return this.SubjectBehaviorSubject.value;
  }

  get getBoolen() {
    return this.boolenBehaviorSubject.value;
  }

  setContent(value: string, subject: SubjectInface) {
    let currentOb: Observable<any> = new Observable();
    this.currentSubject.subscribe((x) => {
      if (x === subject) {
        this.contentBehaviorSubject.next(value);
        switch (value) {
          case 'summary':
            currentOb = this.summary_Service.getSummary(subject);
            break;
          case 'reviews':
            currentOb = this.review_Service.getReview(subject);
            break;
          case 'exams':
            currentOb = this.exam_Service.getExam(subject);
            break;
          case 'tests':
            currentOb = this.test_Service.getTest(subject);
            break;
          default:
            this.allContentBehavior.next(null);
            break;
        }
        currentOb.subscribe((content) => this.allContentBehavior.next(content));
      } else {
        console.log("Error in setContent");
        this.contentBehaviorSubject.next('');
        this.allContentBehavior.next(null);
      }
    });
  }

  setContent_Doctor(value: string, subject: SubjectInface) {
    let currentOb: Observable<any> = new Observable();
    if (subject) {
      this.contentBehaviorSubject.next(value);
      switch (value) {
        case 'summary':
          currentOb = this.summary_Service.getSummary(subject);
          break;
        case 'reviews':
          currentOb = this.review_Service.getReview(subject);
          break;
        case 'exams':
          currentOb = this.exam_Service.getExam(subject);
          break;
        case 'tests':
          currentOb = this.test_Service.getTest(subject);
          break;
        default:
          this.allContentBehavior.next(null);
          break;
      }
      currentOb.subscribe((content) => this.allContentBehavior.next(content));
    } else {
      console.log("Error in setContent_Doctor");
      this.contentBehaviorSubject.next('');
      this.allContentBehavior.next(null);
    }
  }

  get getContent() {
    return this.contentBehaviorSubject.value;
  }

  setSubs(yearid: string) {
    this.getSubjects(yearid).subscribe((data) => {
      this.SubjectBehaviors.next(data);
    });
  }

  private handleError<T>(error: any, result: T): Observable<T> {
    console.error("API Error:", error);
    return of(result);
  }
}
