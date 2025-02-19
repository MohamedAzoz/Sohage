import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../app-home/navbar/navbar.component";

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
