import { CanActivateFn, Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import { inject } from '@angular/core';

export const studentGuardGuard: CanActivateFn = (route, state) => {
  let student=inject(StudentService)
  if(student.user_student()){
      return true;
    }else{
      return false
    }
};
