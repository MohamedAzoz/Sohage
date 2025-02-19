import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../app-home/navbar/navbar.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
constructor(){}
}
