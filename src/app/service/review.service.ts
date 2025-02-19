import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Review } from '../models/review';
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
export class ReviewService {
  private review = new BehaviorSubject<Review | undefined>(undefined);
  public currentReview = this.review.asObservable();

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getReviews(): Observable<Review[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]); // منع الجلب أثناء SSR
    return this.http.get<Review[]>(`${environment.apiUrl}/review`, this.headers).pipe(
      catchError(error => {
        console.error('Error fetching reviews:', error);
        return of([]); // تجنب تعطل التطبيق
      })
    );
  }

  getReview(subject: SubjectInface): Observable<Review[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http.get<Review[]>(`${environment.apiUrl}/review?subjectId=${subject.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error fetching reviews by subject:', error);
        return of([]);
      })
    );
  }

  getReviewByStudentId(student: User): Observable<Review[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http.get<Review[]>(`${environment.apiUrl}/review?uploadedBy=${student.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error fetching reviews by student:', error);
        return of([]);
      })
    );
  }

  AddReview(review: Review): Observable<Review> {
    if (!isPlatformBrowser(this.platformId)) return of(review);
    return this.http.post<Review>(`${environment.apiUrl}/review`, review, this.headers).pipe(
      catchError(error => {
        console.error('Error adding review:', error);
        return of(review);
      })
    );
  }

  DeleteReview(review: Review): Observable<Review> {
    if (!isPlatformBrowser(this.platformId)) return of(review);
    return this.http.delete<Review>(`${environment.apiUrl}/review/${review.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error deleting review:', error);
        return of(review);
      })
    );
  }

  updateReview(review: Review): Observable<Review> {
    if (!isPlatformBrowser(this.platformId)) return of(review);
    return this.http.patch<Review>(`${environment.apiUrl}/review/${review.id}`, review, this.headers).pipe(
      catchError(error => {
        console.error('Error updating review:', error);
        return of(review);
      })
    );
  }

  clickReview(id: string) {
    this.getReviews().subscribe((data) => {
      let selectedReview = data.find((review) => review.id == id);
      this.review.next(selectedReview ?? undefined);
    });
  }
}
