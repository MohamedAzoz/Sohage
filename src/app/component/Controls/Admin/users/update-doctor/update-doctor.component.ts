import { Component, OnInit } from '@angular/core';
import { DoctorData } from '../../../../../models/doctor-data';
import { User } from '../../../../../models/user';
import { DoctorService } from '../../../../../service/doctor.service';
import { UserServiceService } from '../../../../../service/user-service.service';
import { College } from '../../../../../models/college';
import { Department } from '../../../../../models/department';
import { SubjectInface } from '../../../../../models/subject_inface';
import { Year } from '../../../../../models/year';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollegeServiceService } from '../../../../../service/college-service.service';
import { SubjectServiceService } from '../../../../../service/subject-service.service';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.css'
})
export class UpdateDoctorComponent implements OnInit{
  users:User[]=[];
  doctorData:DoctorData={}as DoctorData;
  bool:boolean=false;
  bool1:boolean=false;
  bool2:boolean=false;
  message:string='';
  user:User={} as User
  data:DoctorData={} as DoctorData;
    colleges:College[]=[]
    departments:Department[]=[];
    years:Year[]=[]
    subjects:SubjectInface[]=[]
   collegeid:string='';
   Departmentid:string='';
   yearid:string='';
   subjectid:string='';
   College_Doctor:College[]=[];
   Department_Doctor:Department[]=[];
   Year_Doctor:Year[]=[];
   Subject_Doctor:SubjectInface[]=[];
   AllCollegesId:string[]=[];
   AllDepartmentsId:string[]=[];
   AllYearsId:string[]=[];
   AllSubjectsId:string[]=[];
   showPassword: boolean = false;
constructor(
      private user_service:UserServiceService,
      private doctor_service:DoctorService,
     private college_service:CollegeServiceService,
     private subject_service:SubjectServiceService,
    ){}
     ngOnInit(): void {
   this.fetchColleges();
   this.user.role='doctor';
    this.selecteRole();
    this.doctor_service.colleges_dotor.subscribe((colleges)=>{
      if(colleges){
        this.College_Doctor=colleges;
      }
    });
    this.doctor_service.Departs_doctor.subscribe((depart)=>{
      if(depart)
      {
        this.Department_Doctor=depart;
      }
    });
    this.doctor_service.years_dotor.subscribe((year)=>{
      if(year){
        this.Year_Doctor=year;
      }
    });
    this.doctor_service.subjects_dotor.subscribe((subject)=>{
      if(subject){
        this.Subject_Doctor=subject;
      }
    });
  }
  selecteRole(){
    this.user_service.getUsers().subscribe((data)=>{
      this.users=data.filter((value)=>(value.role==='doctor'));
      this.bool1=true;
     });
  }
  selectDoctor(user:User){
    let Ddata:DoctorData|undefined;
    this.user=user;
    this.doctor_service.getDataUsers().subscribe((value)=>{
      if(value){
        Ddata=value.find((v)=>(v.doctorId==user.id))
        if(Ddata){
          this.doctor_service.getcolleges(Ddata.collegesId);
          this.doctor_service.getDepartments(Ddata.departmentId);
          this.doctor_service.getyears(Ddata.yearsId);
          this.doctor_service.getsubjects(Ddata.subjectsId);
          this.doctorData=Ddata
          this.bool2=true
        }
      }
    });
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
    });
   }
   DeleteCollege(id: string) {
      this.College_Doctor = this.College_Doctor.filter(value => value.id !== id);
  }

   selectCollege(id:string){
      this.college_service.getDepartments(id).subscribe((data)=>{
          this.departments=data??[]
      });
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
    this.subjects=subject ?? [];
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
      this.AllCollegesId.push(college.id);
    }
  }
  DoctorDepartment(departments:Department[]){
    for(let department of departments){
      this.AllDepartmentsId.push(department.id);
    }
  }
  DoctorYear(years:Year[]){
    for(let year of years){
      this.AllYearsId.push(year.id);
    }
  }
  DoctorSubject(subjects:SubjectInface[]){
    for(let subject of subjects){
      this.AllSubjectsId.push(subject.id);
    }
  }

   onSubmit(US: User) {
    this.DoctorCollege(this.College_Doctor);
    this.DoctorDepartment(this.Department_Doctor);
    this.DoctorYear(this.Year_Doctor);
    this.DoctorSubject(this.Subject_Doctor);
     this.user_service.updateUser(US).subscribe((R) => {
       if (R) {
         this.bool1 = true;
               this.doctorData.doctorId=R.id;
               this.doctorData.collegesId=this.AllCollegesId;
               this.doctorData.departmentId=this.AllDepartmentsId;
               this.doctorData.yearsId=this.AllYearsId;
               this.doctorData.subjectsId=this.AllSubjectsId;
               this.doctor_service.updateDataUser(this.doctorData).subscribe((res) => {
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


