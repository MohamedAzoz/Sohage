import { AfterViewInit, Component, OnInit ,Inject, PLATFORM_ID} from '@angular/core';
import { College } from '../../../models/college';
import { RouterModule } from '@angular/router';
import { CollegeServiceService } from '../../../service/college-service.service';
import { isPlatformBrowser } from '@angular/common';

declare let bootstrap: any;

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './colleges.component.html',
  styleUrl: './colleges.component.css'
})
export class CollegesComponent implements OnInit , AfterViewInit{
colleges!:College[]
constructor(
  private college_service:CollegeServiceService,
  @Inject(PLATFORM_ID) private platformId: Object
){}
ngOnInit(): void {
  this.college_service.getColleges().subscribe((data)=>{
    this.colleges=data
  })
}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }
}
