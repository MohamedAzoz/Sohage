import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../models/slider';
import { environment } from '../../environments/environment.development';
import { Carousel } from '../models/carousel';

@Injectable({
  providedIn: 'root'
})
export class AppHomeService {
header={}
  constructor(
    private http:HttpClient
  ) {
    this.header={Headers:new HttpHeaders({
      "Content-type":"application/json"
      ,'X-Access-Key':'$2a$10$8rkCpTdmdUdcXafaJZuWreEaLYhlfRHBLZiSZ2J3Ri3rCA99EhDKy'
    })}
  }
  getCarousels():Observable<Carousel[]>{
    return this.http.get<Carousel[]>(`${environment.jsonBinApiUrl}/carousel`)
  }
AddCarousel(carousel:Carousel):Observable<Carousel>{
    return this.http.post<Carousel>(`${environment.jsonBinApiUrl}/carousel`,carousel,this.header);
  }
deleteCarousel(carousel:Carousel):Observable<Carousel>{
    return this.http.delete<Carousel>(`${environment.jsonBinApiUrl}/carousel/${carousel.id}`,this.header);
  }
updateCarousel(carousel:Carousel):Observable<Carousel>{
  return this.http.patch<Carousel>(`${environment.jsonBinApiUrl}/carousel/${carousel.id}`,carousel,this.header);
}


 getSliders():Observable<Slider[]>{
  return this.http.get<Slider[]>(`${environment.jsonBinApiUrl}/slider`)
 }
 AddSlider(slider:Slider):Observable<Slider>{
      return this.http.post<Slider>(`${environment.jsonBinApiUrl}/slider`,slider,this.header);
    }
    DeleteSlider(slider:Slider):Observable<Slider>{
      return this.http.delete<Slider>(`${environment.jsonBinApiUrl}/slider/${slider.id}`,this.header);
    }

updateSlider(slider:Slider):Observable<Slider>{
    return this.http.patch<Slider>(`${environment.jsonBinApiUrl}/slider/${slider.id}`,slider,this.header);
  }


}
