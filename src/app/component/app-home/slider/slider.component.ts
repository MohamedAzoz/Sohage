import { Component, OnInit } from '@angular/core';
import { AppHomeService } from '../../../service/app-home.service';
import { Slider } from '../../../models/slider';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{
  sliders!:Slider[]
constructor(
  private slider_service:AppHomeService
){}
  ngOnInit(): void {
    this.slider_service.getSliders().subscribe((data)=>{
      this.sliders=data??[]
    })
  }
}
