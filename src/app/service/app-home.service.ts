import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slider } from '../models/slider';
import { environment } from '../../environments/environment.development';
import { Carousel } from '../models/carousel';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppHomeService {
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getCarousels(): Observable<Carousel[]> {
    if (!this.isBrowser()) return of([]);
    return this.http.get<Carousel[]>(`${environment.apiUrl}/carousel`).pipe(
      catchError(error => {
        console.error('Error fetching carousels:', error);
        return of([]);
      })
    );
  }

  addCarousel(carousel: Carousel): Observable<Carousel> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.post<Carousel>(`${environment.apiUrl}/carousel`, carousel, this.headers).pipe(
      catchError(error => {
        console.error('Error adding carousel:', error);
        return of(null as any);
      })
    );
  }

  deleteCarousel(carousel: Carousel): Observable<Carousel> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.delete<Carousel>(`${environment.apiUrl}/carousel/${carousel.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error deleting carousel:', error);
        return of(null as any);
      })
    );
  }

  updateCarousel(carousel: Carousel): Observable<Carousel> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.patch<Carousel>(`${environment.apiUrl}/carousel/${carousel.id}`, carousel, this.headers).pipe(
      catchError(error => {
        console.error('Error updating carousel:', error);
        return of(null as any);
      })
    );
  }

  getSliders(): Observable<Slider[]> {
    if (!this.isBrowser()) return of([]);
    return this.http.get<Slider[]>(`${environment.apiUrl}/slider`).pipe(
      catchError(error => {
        console.error('Error fetching sliders:', error);
        return of([]);
      })
    );
  }

  addSlider(slider: Slider): Observable<Slider> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.post<Slider>(`${environment.apiUrl}/slider`, slider, this.headers).pipe(
      catchError(error => {
        console.error('Error adding slider:', error);
        return of(null as any);
      })
    );
  }

  deleteSlider(slider: Slider): Observable<Slider> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.delete<Slider>(`${environment.apiUrl}/slider/${slider.id}`, this.headers).pipe(
      catchError(error => {
        console.error('Error deleting slider:', error);
        return of(null as any);
      })
    );
  }

  updateSlider(slider: Slider): Observable<Slider> {
    if (!this.isBrowser()) return of(null as any);
    return this.http.patch<Slider>(`${environment.apiUrl}/slider/${slider.id}`, slider, this.headers).pipe(
      catchError(error => {
        console.error('Error updating slider:', error);
        return of(null as any);
      })
    );
  }
}
