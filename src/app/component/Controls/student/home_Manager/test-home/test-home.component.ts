import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestService } from '../../../../../service/test.service';
import { Test } from '../../../../../models/test';
import { User } from '../../../../../models/user';
import { StudentService } from '../../../../../service/student.service';

@Component({
  selector: 'app-test-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-home.component.html',
  styleUrl: './test-home.component.css'
})
export class TestHomeComponent implements OnInit{
  tests!:Test[]
  student:User={} as User
  bool:boolean=false;
  message:string='';
constructor(
  private test_service:TestService,
    private student_service:StudentService

){}
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
        this.student=ST
      }
    })
    this.test_service.getTestByStudentId(this.student).subscribe((R)=>{
      if(R){
        this.tests=R
      }
    })
  }
   DeleteTest(review:Test){
          if(confirm("sure this delete")){
            this.test_service.DeleteTest(review).subscribe((value)=>{
              if(value){
                this.message="been Your Delete successfully";
                this.bool=true;
              }else{
                this.message="error in Delete";
                this.bool=false;
              }
            })
          }
        }
        clickTest(id:string){
          this.test_service.clickTest(id)
        }
}
