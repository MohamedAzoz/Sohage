import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';

export const authGuardGuard : CanActivateFn = (route, state) => {
  let userAuth=inject(AuthenticationServiceService)
  let router=inject(Router)

//============realy databaes========
/*let data;
  userAuth.isLoggedIn$.subscribe((value)=>{
    data=value
  });
if(!data){
      router.navigate(['/login'])
      return false;
    }else{
  return true;
}*/


//============fake Database========
if(userAuth.isAuthenticated){
  return true;
}else{
  router.navigate(['/login']);
  return false;
}

};
