import { Component } from '@angular/core';
import { UpdateStudentComponent } from "../users/update-student/update-student.component";
import { UpdateDoctorComponent } from "../users/update-doctor/update-doctor.component";

@Component({
  selector: 'app-form-update-user',
  standalone: true,
  imports: [ UpdateStudentComponent, UpdateDoctorComponent],
  templateUrl: './form-update-user.component.html',
  styleUrl: './form-update-user.component.css'
})
export class FormUpdateUserComponent{
  content:string='';
    constructor(){}
 selectContent(role:string){
  this.content=role
}

 }
