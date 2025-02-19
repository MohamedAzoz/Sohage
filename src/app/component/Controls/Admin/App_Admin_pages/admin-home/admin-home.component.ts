import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../service/admin.service';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  user:User={} as User;
constructor(
  private admin_service:AdminService
){}
  ngOnInit(): void {
   this.admin_service.usercurrent().subscribe((admin)=>{
    if(admin){
        this.user=admin;
    }
   })
  }
}

