import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user';
import { DoctorData } from '../models/doctor-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CollegeServiceService } from './college-service.service';
import { Year } from '../models/year';
import { College } from '../models/college';
import { Department } from '../models/department';
import { SubjectInface } from '../models/subject_inface';
import { SubjectServiceService } from './subject-service.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  subject_doctor: SubjectInface[] = [];
  year_doctor: Year[] = [];
  Depart_doctor: Department[] = [];
  colleges: College[] = [];
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  private isDoctor = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | undefined>(undefined);
  private doctorData = new BehaviorSubject<DoctorData | undefined>(undefined);
  userData = this.doctorData.asObservable();

  private yearsBehavior = new BehaviorSubject<Year[] | undefined>(undefined);
  years_dotor = this.yearsBehavior.asObservable();

  private DepartsBehavior = new BehaviorSubject<Department[] | undefined>(undefined);
  Departs_doctor = this.DepartsBehavior.asObservable();

  private collegesBehavior = new BehaviorSubject<College[] | undefined>(undefined);
  colleges_dotor = this.collegesBehavior.asObservable();

  private subjectsBehavior = new BehaviorSubject<SubjectInface[] | undefined>(undefined);
  subjects_dotor = this.subjectsBehavior.asObservable();

  private onesubjectBehavior = new BehaviorSubject<SubjectInface | undefined>(undefined);
  onesubject = this.onesubjectBehavior.asObservable();

  private NoticeseBehavior = new BehaviorSubject<Date[] | undefined>(undefined);
  Notices_time = this.NoticeseBehavior.asObservable();

  constructor(
    private userService: UserServiceService,
    private college_service: CollegeServiceService,
    private subject_service: SubjectServiceService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setDataUser(user: DoctorData): Observable<DoctorData> {
    return this.http.post<DoctorData>(`${environment.apiUrl}/doctor_data`, user, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error setting user data:', error);
        return of(user);
      })
    );
  }

  getDataUsers(): Observable<DoctorData[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http.get<DoctorData[]>(`${environment.apiUrl}/doctor_data`).pipe(
      catchError(error => {
        console.error('Error fetching doctor data:', error);
        return of([]);
      })
    );
  }

  getDataUser(id: string): Observable<DoctorData> {
    if (!isPlatformBrowser(this.platformId)) return of(undefined as any);
    return this.http.get<DoctorData>(`${environment.apiUrl}/doctor_data?doctorId=${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching doctor data for ID ${id}:`, error);
        return of(undefined as any);
      })
    );
  }

  deleteDataUser(user: DoctorData): Observable<DoctorData> {
    return this.http.delete<DoctorData>(`${environment.apiUrl}/doctor_data/${user.id}`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error deleting doctor data:', error);
        return of(user);
      })
    );
  }

  updateDataUser(user: DoctorData): Observable<DoctorData> {
    return this.http.patch<DoctorData>(`${environment.apiUrl}/doctor_data/${user.id}`, user, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error updating doctor data:', error);
        return of(user);
      })
    );
  }

  checkDoctor(username: string) {
    this.userService.getUsers().subscribe(role => {
      let userRole = role.find(user => user.username === username && user.role === 'doctor');
      this.isDoctor.next(!!userRole);
      this.user.next(userRole);
    });
  }

  isbool(): Observable<boolean> {
    return this.isDoctor.asObservable();
  }

  user_doctor(): boolean {
    return this.isDoctor.value;
  }

  usercurrent(): Observable<User | undefined> {
    return this.user.asObservable();
  }

  setDoctor(user: User) {
    this.getDataUsers().subscribe(data => {
      let us = data.find(v => v.doctorId === user.id);
      this.doctorData.next(us || undefined);
    });
  }

  getcolleges(colleges: string[]) {
    colleges.forEach(collegeId => {
      this.college_service.getColleges().subscribe(data => {
        let college = data.find(v => v.id === collegeId);
        if (college && !this.colleges.some(b => b.id === college.id)) {
          this.colleges.push(college);
          this.collegesBehavior.next(this.colleges);
        }
      });
    });
  }

  getDepartments(Departs: string[]) {
    Departs.forEach(DepartId => {
      this.college_service.getDepartment_Doctor().subscribe(data => {
        let Depart = data.find(v => v.id === DepartId);
        if (Depart && !this.Depart_doctor.some(b => b.id === Depart.id)) {
          this.Depart_doctor.push(Depart);
          this.DepartsBehavior.next(this.Depart_doctor);
        }
      });
    });
  }

  getyears(years: string[]) {
    years.forEach(yearId => {
      this.college_service.getYears_Doctor().subscribe(data => {
        let year = data.find(v => v.id === yearId);
        if (year && !this.year_doctor.some(b => b.id === year.id)) {
          this.year_doctor.push(year);
          this.yearsBehavior.next(this.year_doctor);
        }
      });
    });
  }

  getsubjects(subjects: string[]) {
    subjects.forEach(sub => {
      this.subject_service.getSubject_Doctor().subscribe(data => {
        let subject = data.find(v => v.id === sub);
        if (subject && !this.subject_doctor.some(b => b.id === subject.id)) {
          this.subject_doctor.push(subject);
          this.subjectsBehavior.next(this.subject_doctor);
        }
      });
    });
  }
}
