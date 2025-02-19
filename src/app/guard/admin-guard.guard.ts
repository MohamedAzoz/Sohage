import { CanActivateFn } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  let admin=inject(AdminService)
      if(admin.user_admin()){
        return true;
      }else{
        return false
      }
};
