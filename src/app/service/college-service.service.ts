import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { College } from '../models/college';
import { Department } from '../models/department';
import { Year } from '../models/year';

@Injectable({
  providedIn: 'root'
})
export class CollegeServiceService {
  private header = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private department = new BehaviorSubject<Department | null>(null);
  currentDepartment: Observable<Department | null> = this.department.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  //=============== College  Service ==============
  getColleges(): Observable<College[]> {
    return this.safeHttpCall<College[]>(`${environment.apiUrl}/college`);
  }

  getCollege(Id: string): Observable<College> {
    return this.safeHttpCall<College>(`${environment.apiUrl}/college/${Id}`);
  }

  AddCollege(college: College): Observable<College> {
    return this.safeHttpPost<College>(`${environment.apiUrl}/college`, college);
  }

  DeleteCollege(college: College): Observable<College> {
    return this.safeHttpDelete<College>(`${environment.apiUrl}/college/${college.id}`);
  }

  updateCollege(college: College): Observable<College> {
    return this.safeHttpPatch<College>(`${environment.apiUrl}/college/${college.id}`, college);
  }

  //================ Departments  Service =====================
  getDepartments(id: string): Observable<Department[]> {
    return this.safeHttpCall<Department[]>(`${environment.apiUrl}/department?collegeId=${id}`);
  }

  getDepartment_Doctor(): Observable<Department[]> {
    return this.safeHttpCall<Department[]>(`${environment.apiUrl}/department`);
  }

  getDepartmentone(id: string): Observable<Department> {
    return this.safeHttpCall<Department>(`${environment.apiUrl}/department/${id}`);
  }

  AddDepartment(department: Department): Observable<Department> {
    return this.safeHttpPost<Department>(`${environment.apiUrl}/department`, department);
  }

  DeleteDepartment(department: Department): Observable<Department> {
    return this.safeHttpDelete<Department>(`${environment.apiUrl}/department/${department.id}`);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.safeHttpPatch<Department>(`${environment.apiUrl}/department/${department.id}`, department);
  }

  //================= Year  Service===================
  getYears_Doctor(): Observable<Year[]> {
    return this.safeHttpCall<Year[]>(`${environment.apiUrl}/year`);
  }

  getYears(id: string): Observable<Year[]> {
    return this.safeHttpCall<Year[]>(`${environment.apiUrl}/year?departmentId=${id}`);
  }

  getYear(id: string): Observable<Year> {
    return this.safeHttpCall<Year>(`${environment.apiUrl}/year/${id}`);
  }

  AddYear(year: Year): Observable<Year> {
    return this.safeHttpPost<Year>(`${environment.apiUrl}/year`, year);
  }

  DeleteYear(year: Year): Observable<Year> {
    return this.safeHttpDelete<Year>(`${environment.apiUrl}/year/${year.id}`);
  }

  updateYear(year: Year): Observable<Year> {
    return this.safeHttpPatch<Year>(`${environment.apiUrl}/year/${year.id}`, year);
  }

  setDepartment(depart: Department) {
    this.department.next(depart);
  }

  getDepartment() {
    return this.department.value;
  }

  //================ Helper Methods ================
  private safeHttpCall<T>(url: string): Observable<T> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<T>(url, this.header).pipe(
        catchError(error => {
          console.error(`Error fetching data from ${url}:`, error);
          return of([] as unknown as T);
        })
      );
    }
    return of([] as unknown as T);
  }

  private safeHttpPost<T>(url: string, data: any): Observable<T> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<T>(url, data, this.header).pipe(
        catchError(error => {
          console.error(`Error posting data to ${url}:`, error);
          return of(null as unknown as T);
        })
      );
    }
    return of(null as unknown as T);
  }

  private safeHttpDelete<T>(url: string): Observable<T> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<T>(url, this.header).pipe(
        catchError(error => {
          console.error(`Error deleting data from ${url}:`, error);
          return of(null as unknown as T);
        })
      );
    }
    return of(null as unknown as T);
  }

  private safeHttpPatch<T>(url: string, data: any): Observable<T> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.patch<T>(url, data, this.header).pipe(
        catchError(error => {
          console.error(`Error patching data to ${url}:`, error);
          return of(null as unknown as T);
        })
      );
    }
    return of(null as unknown as T);
  }
}
