import { Component , AfterViewInit, OnInit, PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppHomeService } from '../../../service/app-home.service';
import { Carousel } from '../../../models/carousel';
declare const bootstrap: any;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit ,AfterViewInit{
  carousels!:Carousel[]
  constructor(
    private carousel_Service:AppHomeService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

    ngAfterViewInit() {
      if (isPlatformBrowser(this.platformId)) {
        new bootstrap.ScrollSpy(document.body, {
          target: '#nav',
        });
      }
    }
  ngOnInit(): void {
   this.carousel_Service.getCarousels().subscribe((data)=>{
      this.carousels=data;
   })
  }


}
