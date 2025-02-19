import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, NavbarComponent,ContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
