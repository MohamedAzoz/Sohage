import { Component, AfterViewInit} from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { SliderComponent } from "../slider/slider.component";
import { CollegesComponent } from '../colleges/colleges.component';
import { isPlatformBrowser } from '@angular/common';
  import { Inject, PLATFORM_ID } from '@angular/core';

declare const bootstrap: any;
@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CarouselComponent, CollegesComponent, SliderComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements AfterViewInit {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngAfterViewInit() {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('scroll', this.handleScroll);
      }
    }

    ngOnDestroy() {
      if (isPlatformBrowser(this.platformId)) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    }

    handleScroll = () => {
      const icons = document.querySelectorAll('.ic');
      icons.forEach((icon) => {
        if (this.isElementInViewport(icon)) {
          icon.classList.add('icsh');
        }
      });
    };

    isElementInViewport(element: any): boolean {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  }

