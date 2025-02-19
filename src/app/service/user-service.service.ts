import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUsers(): Observable<User[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<User[]>(`${environment.apiUrl}/users`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]); // إرجاع مصفوفة فارغة عند حدوث خطأ
        })
      );
    } else {
      return of([]); // عدم تحميل البيانات في بيئة SSR
    }
  }

  getuserone(username: string): Observable<User> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<User>(`${environment.apiUrl}/users?username=${username}`, { headers: this.headers }).pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return of(null as any); // إرجاع null عند حدوث خطأ
        })
      );
    } else {
      return of(null as any);
    }
  }

  adduser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return of(null as any);
      })
    );
  }

  DeleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${user.id}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return of(null as any);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${user.id}`, user, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return of(null as any);
      })
    );
  }

  updatePassword(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${user.id}`, user, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error updating password:', error);
        return of(null as any);
      })
    );
  }
}
