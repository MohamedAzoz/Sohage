import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { College } from '../../../../../models/college';
import { Department } from '../../../../../models/department';
import { DoctorData } from '../../../../../models/doctor-data';
import { User } from '../../../../../models/user';
import { Year } from '../../../../../models/year';
import { CollegeServiceService } from '../../../../../service/college-service.service';
import { DoctorService } from '../../../../../service/doctor.service';
import { UserServiceService } from '../../../../../service/user-service.service';
import { SubjectServiceService } from '../../../../../service/subject-service.service';
import { SubjectInface } from '../../../../../models/subject_inface';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit{
  user:User={} as User
  doctorData:DoctorData={}as DoctorData;
  data:DoctorData={} as DoctorData;
  colleges:College[]=[]
  departments:Department[]=[];
  years:Year[]=[]
  subjects:SubjectInface[]=[]
 message!:string;
 collegeid:string='';
 Departmentid:string='';
 yearid:string='';
 subjectid:string='';
 College_Doctor:College[]=[];
 Department_Doctor:Department[]=[];
 Year_Doctor:Year[]=[];
 Subject_Doctor:SubjectInface[]=[];
 AllColleges:string[]=[];
 AllDepartments:string[]=[];
 AllYears:string[]=[];
 AllSubjects:string[]=[];
 bool:boolean=false;
 bool1:boolean=false;
 bool2:boolean=false;
 showPassword: boolean = false;
 constructor(
     private user_service:UserServiceService,
     private college_service:CollegeServiceService,
     private doctor_service:DoctorService,
     private subject_service:SubjectServiceService,
    ){}
     ngOnInit(): void {
   this.fetchColleges();
   this.user.role='doctor';
 }

 togglePassword() {
  this.showPassword = !this.showPassword;
}
 //=======Colleges Function=========
 fetchColleges(){
  this.college_service.getColleges().subscribe((data)=>{
    this.colleges=data??[]
});
 }
 selectCollegeDoctor(id:string){
  this.college_service.getCollege(id).subscribe((college)=>{
    let value=this.College_Doctor.find((value)=>(value.id==college.id));
    if(!value){
      this.College_Doctor.push(college);
      this.collegeid=''
    }
  })
 }
 DeleteCollege(id: string) {
  this.College_Doctor = this.College_Doctor.filter(value => value.id !== id);
}

 selectCollege(id:string){
 this.college_service.getDepartments(id).subscribe((data)=>{
 this.departments=data??[]

 })
 }
 //========Department functions=======
 selectDepartmentDoctor(id:string){
  this.college_service.getDepartmentone(id).subscribe((Depart)=>{
    let value=this.Department_Doctor.find((value)=>(value.id==Depart.id));
    if(!value){
      this.Department_Doctor.push(Depart);
      this.Departmentid=''
    }
  });
 }

 DeleteDepartment(id: string) {
  this.Department_Doctor = this.Department_Doctor.filter(value => value.id !== id);
}

 selectDepartment(id:string){
   this.college_service.getYears(id).subscribe((data)=>{
       this.years=data ?? [];
   });
 }

 //==========Year Function========
selectYearsDoctor(id:string){
  this.college_service.getYear(id).subscribe((year)=>{
    let value=this.Year_Doctor.find((value)=>(value.id==year.id));
    if(!value){
      this.Year_Doctor.push(year);
      this.yearid=''
    }
  });
 }

DeleteYear(id: string) {
  this.Year_Doctor = this.Year_Doctor.filter(value => value.id !== id);
}
selectYear(id:string){
this.subject_service.getSubjects(id).subscribe((subject)=>{
  this.subjects=subject ?? []
});
}

//===========Subject Function=====
selectSubjectsDoctor(id:string){
  this.subject_service.getSubjectone(id).subscribe((subject)=>{
    let value=this.Subject_Doctor.find((value)=>(value.id==subject.id));
    if(!value){
      this.Subject_Doctor.push(subject);
      this.subjectid='';
    }
  });
 }

 DeleteSubject(id: string) {
  this.Subject_Doctor = this.Subject_Doctor.filter(value => value.id !== id);
}

//=============================================
DoctorCollege(colleges:College[]){
  for(let college of colleges){
    this.AllColleges.push(college.id);
  }
}
DoctorDepartment(departments:Department[]){
  for(let department of departments){
    this.AllDepartments.push(department.id);
  }
}
DoctorYear(years:Year[]){
  for(let year of years){
    this.AllYears.push(year.id);
  }
}
DoctorSubject(subjects:SubjectInface[]){
  for(let subject of subjects){
    this.AllSubjects.push(subject.id);
  }
}

 onSubmit(US: User) {
  this.DoctorCollege(this.College_Doctor);
  this.DoctorDepartment(this.Department_Doctor);
  this.DoctorYear(this.Year_Doctor);
  this.DoctorSubject(this.Subject_Doctor);
   this.user_service.adduser(US).subscribe((R) => {
     if (R) {
       this.bool1 = true;
             this.doctorData.doctorId=R.id;
             this.doctorData.collegesId=this.AllColleges;
             this.doctorData.departmentId=this.AllDepartments;
             this.doctorData.yearsId=this.AllYears;
             this.doctorData.subjectsId=this.AllSubjects;
             this.doctor_service.setDataUser(this.doctorData).subscribe((res) => {
              this.bool2 = !!res;
              this.check();
            });
     } else {
       this.bool1 = false;
       this.check();
     }
   });
 }

 check() {
   if (this.bool1 && this.bool2) {
     this.bool = true;
     this.message = "User has been updated successfully.";
   } else {
     this.bool = false;
     this.message = "Error occurred.";
   }
 }
 }

