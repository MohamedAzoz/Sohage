import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../../service/user-service.service';
import { User } from '../../../models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form-update-your-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-update-your-data.component.html',
  styleUrl: './form-update-your-data.component.css'
})
export class FormUpdateYourDataComponent implements OnInit{
user: User = {} as User;
usercurrent: User | undefined;
userdata: User = {} as User;
password1:string='';
password2:string='';
errorMessage:string = '';
errorpass:string = '';
username:string='';
bool:boolean=false;
select:boolean=false;
showPassword: boolean = false;
 constructor(
    private userService: UserServiceService,
    private CookieService:CookieService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.username= this.CookieService.get('token');
    this.userService.getUsers().subscribe((data)=>{
      if(data){
        this.usercurrent=data.find((V)=>(V.username===this.username))
      }
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

checkpassword(pass:string){
  if(this.username!=''){
    if(this.usercurrent?.password==pass)
      {
       this.select=true;
      }else{
       this.errorpass="passwored isn't correct";
      }
  }

}
  updatePassword(password1:string,password2:string){
    if(this.usercurrent){
      this.user=this.usercurrent;
       if(password1==password2 && (password1.trim()||password2.trim()!='')){
        this.user.password=password1;
        this.userService.updatePassword(this.user).subscribe((us)=>{
          if(us){
            this.bool=true;
          }else{
            this.bool=false;
          }
        })
      }else{
         this.errorMessage='The two passwords are not equal';
      }
    }
  }
  back(){
    this.location.back();
  }
}
