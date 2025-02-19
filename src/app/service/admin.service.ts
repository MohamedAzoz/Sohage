import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   private isAdmin=new BehaviorSubject<boolean>(false);
   private user=new BehaviorSubject<User|undefined>(undefined);

  constructor(
        private userService:UserServiceService,

  ) { }
   checkAdmin(username:string){
      this.userService.getUsers().subscribe((role)=>{
        let userRole=role.find((user)=>user.username==username && user.role=='admin');
        this.isAdmin.next(!!userRole);
        this.user.next(userRole);
      })
    }
    isbool():Observable<boolean>{
      return  this.isAdmin.asObservable();
    }

  user_admin():boolean{
    return (this.isAdmin.value)?true:false;
  }
  usercurrent():Observable<User|undefined>{
    return this.user.asObservable();
  }
}
