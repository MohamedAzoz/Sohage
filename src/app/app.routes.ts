import { Routes } from '@angular/router';
import { HomeComponent } from './component/app-home/home/home.component';
import { ErrorComponent } from './component/error/error.component';
import { MainComponent } from './component/main/main.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { adminGuardGuard } from './guard/admin-guard.guard';
import { doctorGuardGuard } from './guard/doctor-guard.guard';
import { studentGuardGuard } from './guard/student-guard.guard';

export const routes: Routes = [
  {path:"", redirectTo:"",pathMatch:'full'},
  {path:"",component:MainComponent,children:[
    {path:"",component:HomeComponent, title:"جامعة سوهاج"},
    {path:"login",loadComponent: () => import('./component/app-home/login/login.component').then(m => m.LoginComponent), title:"Login"},
    {path:"college/:id",loadComponent: () => import('./component/college/college.component').then(m => m.CollegeComponent), title:"College"},
  ]},

  {path:"student", loadComponent: () => import('./component/Controls/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
    title:"Student Dashboard",
    canActivate:[authGuardGuard],
    children:[
      {path:"", redirectTo:"student",pathMatch:'full'},
      {path:"student",loadComponent: () => import('./component/Controls/student/student-main-home/student-main-home.component').then(m => m.StudentMainHomeComponent), title:"Student",canActivate:[studentGuardGuard]},

      {path:"summarymanager",loadComponent: () => import('./component/Controls/student/Manager/summary-manager/summary-manager.component').then(m => m.SummaryManagerComponent),
        title:"Summary Manager",
        canActivate:[studentGuardGuard],
        children:[
          {path:"", redirectTo:"summaryhome",pathMatch:'full'},
          {path:"summaryhome",loadComponent: () => import('./component/Controls/student/home_Manager/summary-home/summary-home.component').then(m => m.SummaryHomeComponent), title:"Summary Home",canActivate:[authGuardGuard]},
          {path:"summaryform",loadComponent: () => import('./component/Controls/student/Forms/summary-form/summary-form.component').then(m => m.SummaryFormComponent), title:"Summary Form",canActivate:[authGuardGuard]},
      ]},

      {path:"reviewmanager",loadComponent: () => import('./component/Controls/student/Manager/review-manager/review-manager.component').then(m => m.ReviewManagerComponent),
        title:"Review Manager",
        canActivate:[studentGuardGuard],
        children:[
          {path:"", redirectTo:"reviewhome",pathMatch:'full'},
          {path:"reviewhome",loadComponent: () => import('./component/Controls/student/home_Manager/review-home/review-home.component').then(m => m.ReviewHomeComponent), title:"Review Home",canActivate:[authGuardGuard]},
          {path:"reviewform",loadComponent: () => import('./component/Controls/student/Forms/review-form/review-form.component').then(m => m.ReviewFormComponent), title:"Review Form",canActivate:[authGuardGuard]},
      ]},

      {path:"testmanager",loadComponent: () => import('./component/Controls/student/Manager/test-manager/test-manager.component').then(m => m.TestManagerComponent),
        title:"Test Manager",
        canActivate:[studentGuardGuard],
        children:[
          {path:"", redirectTo:"testhome",pathMatch:'full'},
          {path:"testhome",loadComponent: () => import('./component/Controls/student/home_Manager/test-home/test-home.component').then(m => m.TestHomeComponent), title:"Test Home",canActivate:[authGuardGuard]},
          {path:"testform",loadComponent: () => import('./component/Controls/student/Forms/test-form/test-form.component').then(m => m.TestFormComponent), title:"Test Form",canActivate:[authGuardGuard]},
      ]},

      {path:"exammanager",loadComponent: () => import('./component/Controls/student/Manager/exam-manager/exam-manager.component').then(m => m.ExamManagerComponent),
        title:"Exam Manager",
        canActivate:[studentGuardGuard],
        children:[
          {path:"", redirectTo:"examhome",pathMatch:'full'},
          {path:"examhome",loadComponent: () => import('./component/Controls/student/home_Manager/exam-home/exam-home.component').then(m => m.ExamHomeComponent), title:"Exam Home",canActivate:[authGuardGuard]},
          {path:"examform",loadComponent: () => import('./component/Controls/student/Forms/exam-form/exam-form.component').then(m => m.ExamFormComponent), title:"Exam Form",canActivate:[authGuardGuard]},
      ]},
  ]},


  {path:"Admin",loadComponent: () => import('./component/Controls/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    title:"Admin Dashboard",
    canActivate:[authGuardGuard],
    children:[
      {path:"", redirectTo:"admin",pathMatch:'full'},
      {path:"admin",loadComponent: () => import('./component/Controls/Admin/App_Admin_pages/admin-home/admin-home.component').then(m => m.AdminHomeComponent), title:"Admin",canActivate:[adminGuardGuard]},
      {path:"addManager",loadComponent: () => import('./component/Controls/Admin/App_Admin_pages/add-manager/add-manager.component').then(m => m.AddManagerComponent), title:"Add Manager",canActivate:[adminGuardGuard]},
      {path:"updateManager",loadComponent: () => import('./component/Controls/Admin/App_Admin_pages/update-manager/update-manager.component').then(m => m.UpdateManagerComponent), title:"Update Manager",canActivate:[adminGuardGuard]},
      {path:"deleteManager",loadComponent: () => import('./component/Controls/Admin/App_Admin_pages/delete-manager/delete-manager.component').then(m => m.DeleteManagerComponent), title:"Delete Manager",canActivate:[adminGuardGuard]},
      {path:"addCollege",loadComponent: () => import('./component/Controls/Admin/form-add-college/form-add-college.component').then(m => m.FormAddCollegeComponent), title:"Add College",canActivate:[adminGuardGuard]},
      {path:"updateCollege",loadComponent: () => import('./component/Controls/Admin/form-update-college/form-update-college.component').then(m => m.FormUpdateCollegeComponent), title:"Update College",canActivate:[adminGuardGuard]},
      {path:"deleteCollege",loadComponent: () => import('./component/Controls/Admin/form-delete-college/form-delete-college.component').then(m => m.FormDeleteCollegeComponent), title:"Delete College",canActivate:[adminGuardGuard]},

      {path:"addDepartment",loadComponent: () => import('./component/Controls/Admin/form-add-department/form-add-department.component').then(m => m.FormAddDepartmentComponent), title:"Add Department",canActivate:[adminGuardGuard]},
      {path:"updateDepartment",loadComponent: () => import('./component/Controls/Admin/form-update-department/form-update-department.component').then(m => m.FormUpdateDepartmentComponent), title:"Update Department",canActivate:[adminGuardGuard]},
      {path:"deleteDepartment",loadComponent: () => import('./component/Controls/Admin/form-delete-department/form-delete-department.component').then(m => m.FormDeleteDepartmentComponent), title:"Delete Department",canActivate:[adminGuardGuard]},

      {path:"addYear",loadComponent: () => import('./component/Controls/Admin/form-add-year/form-add-year.component').then(m => m.FormAddYearComponent), title:"Add Year",canActivate:[adminGuardGuard]},
      {path:"updateYear",loadComponent: () => import('./component/Controls/Admin/form-update-year/form-update-year.component').then(m => m.FormUpdateYearComponent), title:"Update Year",canActivate:[adminGuardGuard]},
      {path:"deleteYear",loadComponent: () => import('./component/Controls/Admin/form-delete-year/form-delete-year.component').then(m => m.FormDeleteYearComponent), title:"Delete Year",canActivate:[adminGuardGuard]},

      {path:"addSubject",loadComponent: () => import('./component/Controls/Admin/form-subject/form-subject.component').then(m => m.FormSubjectComponent), title:"Add Subject",canActivate:[adminGuardGuard]},
      {path:"updateSubject",loadComponent: () => import('./component/Controls/Admin/form-update-subject/form-update-subject.component').then(m => m.FormUpdateSubjectComponent), title:"Update Subject",canActivate:[adminGuardGuard]},
      {path:"deleteSubject",loadComponent: () => import('./component/Controls/Admin/form-delete-subject/form-delete-subject.component').then(m => m.FormDeleteSubjectComponent), title:"Delete Subject",canActivate:[adminGuardGuard]},

      {path:"addUser",loadComponent: () => import('./component/Controls/Admin/form-add-user/form-add-user.component').then(m => m.FormAddUserComponent), title:"Add User",canActivate:[adminGuardGuard]},
      {path:"updateUser",loadComponent: () => import('./component/Controls/Admin/form-update-user/form-update-user.component').then(m => m.FormUpdateUserComponent), title:"Update User",canActivate:[adminGuardGuard]},
      {path:"deleteUser",loadComponent: () => import('./component/Controls/Admin/form-delete-user/form-delete-user.component').then(m => m.FormDeleteUserComponent), title:"Delete User",canActivate:[adminGuardGuard]},
    ]},


  {path:"Doctor",loadComponent: () => import('./component/Controls/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent),
    title:"Doctor Dashboard",
    canActivate:[authGuardGuard],
    children:[
      {path:"", redirectTo:"doctor",pathMatch:'full'},
      {path:"doctor",loadComponent: () => import('./component/Controls/doctor/doctor-home/doctor-home.component').then(m => m.DoctorHomeComponent), title:"Doctor",canActivate:[doctorGuardGuard]},
      {path:"updatedoctor",loadComponent: () => import('./component/Controls/doctor/update-manager-by-doctor/update-manager-by-doctor.component').then(m => m.UpdateManagerByDoctorComponent), title:"Update Manager",canActivate:[doctorGuardGuard]},
      {path:"deletedoctor",loadComponent: () => import('./component/Controls/doctor/delete-manager-by-doctor/delete-manager-by-doctor.component').then(m => m.DeleteManagerByDoctorComponent), title:"Delete Manager",canActivate:[doctorGuardGuard]},
      {path:"notices",loadComponent: () => import('./component/Controls/doctor/notices/notices.component').then(m => m.NoticesComponent), title:"Notices",canActivate:[authGuardGuard]},
    ]},


  {path:"updatesummary",loadComponent: () => import('./component/Controls/student/Forms/update-summary/update-summary.component').then(m => m.UpdateSummaryComponent), title:"Update Summary",canActivate:[authGuardGuard]},
  {path:"updatereviews",loadComponent: () => import('./component/Controls/student/Forms/update-review/update-review.component').then(m => m.UpdateReviewComponent), title:"Update Review",canActivate:[authGuardGuard]},
  {path:"updateexams",loadComponent: () => import('./component/Controls/student/Forms/update-exam/update-exam.component').then(m => m.UpdateExamComponent), title:"Update Exam",canActivate:[authGuardGuard]},
  {path:"updatetests",loadComponent: () => import('./component/Controls/student/Forms/update-test/update-test.component').then(m => m.UpdateTestComponent), title:"Update Test",canActivate:[authGuardGuard]},
  {path:"updateYourData",loadComponent: () => import('./component/Controls/form-update-your-data/form-update-your-data.component').then(m => m.FormUpdateYourDataComponent), title:"Update Your Data",canActivate:[authGuardGuard]},

  {path:"**",component:ErrorComponent, title:"not found"}
];
