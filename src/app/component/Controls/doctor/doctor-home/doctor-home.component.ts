import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../service/doctor.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent implements OnInit{
  user:User={} as User;
constructor(
  private doctor_service:DoctorService
){}
  ngOnInit(): void {
   this.doctor_service.usercurrent().subscribe((doctor)=>{
    if(doctor){
        this.user=doctor;
    }
   })
  }
}
