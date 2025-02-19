import { Component } from '@angular/core';
import { AddStudentComponent } from "../users/add-student/add-student.component";
import { AddDoctorComponent } from '../users/add-doctor/add-doctor.component';

@Component({
  selector: 'app-form-add-user',
  standalone: true,
  imports: [ AddStudentComponent, AddDoctorComponent],
  templateUrl: './form-add-user.component.html',
  styleUrl: './form-add-user.component.css'
})
export class FormAddUserComponent {
content:string='';
   constructor(){}

selectContent(role:string){
    this.content=role
}
}
