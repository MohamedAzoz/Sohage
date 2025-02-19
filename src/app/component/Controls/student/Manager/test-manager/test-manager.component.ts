import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TestService } from '../../../../../service/test.service';
import { Test } from '../../../../../models/test';
import { StudentService } from '../../../../../service/student.service';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-test-manager',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './test-manager.component.html',
  styleUrl: './test-manager.component.css'
})
export class TestManagerComponent implements OnInit{
  tests:Test[]=[] as Test[]
  student:User={} as User
constructor(
  private test_service:TestService,
  private student_service:StudentService,

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST;
      }
    })
    this.test_service.getTestByStudentId(this.student).subscribe((T)=>{
        this.tests=T;
    })
  }
}
