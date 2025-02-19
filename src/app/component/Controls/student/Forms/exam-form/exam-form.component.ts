import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../../../models/exam';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';
import { ExamServiceService } from '../../../../../service/exam-service.service';
import { SubjectServiceService } from '../../../../../service/subject-service.service';
import { StudentService } from '../../../../../service/student.service';
import { SubjectInface } from '../../../../../models/subject_inface';
import { BehaviorSubject, Observable } from 'rxjs';
import { StudentData } from '../../../../../models/student-data';
import { User } from '../../../../../models/user';
import { DoctorService } from '../../../../../service/doctor.service';
import { NoticesService } from '../../../../../service/notices.service';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent implements OnInit{
 private student=new BehaviorSubject<User|null>(null)

 date:Date=new Date
user:User={} as User
userd:StudentData|undefined;
  exam:Exam={} as Exam
  selectFile:File|null=null;
  subjects:SubjectInface[]=[] as SubjectInface[]
  message!:string;
  bool!:boolean;
 constructor(
  private http:HttpClient,
  private exam_service:ExamServiceService,
  private notices_service:NoticesService,
  private subject_service:SubjectServiceService,
  private student_service:StudentService
 ){
  //  let ObservableSubjects:Observable<SubjectInface[]>=new Observable;

  // this.student_service.usercurrent().subscribe((ST)=>{
  //   if(ST){
  //     this.user=ST
  //     this.student_service.setuser(ST);
  //     // console.log(this.user);
  //     // console.log(this.user.username);
  //   }
  // });
  //   this.student_service.userData.subscribe((data)=>{
  //     if(data){

  //       ObservableSubjects=this.subject_service.getSubjects(data.yearId);
  //       console.log(data);
  //     }

  //   });

  //   ObservableSubjects.subscribe((s)=>{
  //     if(s){
  //       this.subjects=s
  //       console.log(this.subjects[0]);
  //     }else{
  //       this.subjects=[]
  //       console.log(this.subjects);
  //     }
  //   })


 }
  ngOnInit(): void {
    this.student_service.usercurrent().subscribe((ST)=>{
      if(ST){
      this.student.next(ST)
        this.student_service.setuser(ST);
      }
    });
    this.student_service.userData.subscribe((data)=>{
        if(data){
          this.subject_service.setSubs(data.yearId);
        }
      });

      this.subject_service.currentSubs.subscribe((s)=>{
        if(s){
          this.subjects=s
        }else{
          this.subjects=[]
        }
      })
    }

//  onFileSelect(event: any) {
//   this.selectFile = event.target.files[0];
// }
//  onSubmit(form:any){
//   if(form.valid && this.selectFile){
//     const dataForm=new FormData();
//      dataForm.append('title',form.title);
//      dataForm.append('title',form.title);
//      dataForm.append('title',form.title);
//      dataForm.append('title',form.title);
//      this.http.post(`${environment.apiUrl}/exam/`,dataForm).subscribe((response)=>{
//       console.log("تم رفع الا متحان",response);
//      })
//       }
//   }

onSubmit(exam:Exam){
  this.student.subscribe((ST)=>{
    if(ST){
      this.exam.uploadedBy=ST.id;
      exam.updatedAt=this.date
    this.exam_service.AddExam(exam).subscribe((EX)=>{
      if(EX){
        this.message="been Your add successfully";
        this.bool=true;
        this.notices_service.AddNotification('exam',exam.subjectId,ST.name,exam.fileUrl)
      }else{
        this.message="error in Add";
        this.bool=false;
      }
    })
    }
    })

}
}
