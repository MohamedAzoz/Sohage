import { CanActivateFn, Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { inject } from '@angular/core';

export const doctorGuardGuard: CanActivateFn = (route, state) => {
   let doctor=inject(DoctorService)
  if(doctor.user_doctor()){
    return true;
  }else{
    return false;
  }
};


