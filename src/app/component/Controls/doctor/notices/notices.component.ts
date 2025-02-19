import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../../../../../app/service/notices.service';
import { Notification } from '../../../../../app/models/notification';
import { CommonModule, Location } from '@angular/common';
import { DoctorService } from '../../../../../app/service/doctor.service';
import { combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit{
  date:Date[]=[]
  massege:string=''
  notification:Notification[]=[]
 constructor(
  private notification_service:NoticesService,
  private doctor_service:DoctorService,
  private location:Location
 ){
 }
  ngOnInit(): void {
    this.doctor_service.usercurrent().subscribe((doctor) => {
      if (doctor) this.doctor_service.setDoctor(doctor);
    });

    this.doctor_service.userData.subscribe((data) => {
      if (data) {
        this.doctor_service.getsubjects(data.subjectsId);
      }
    });

    combineLatest([
      this.doctor_service.subjects_dotor,
      this.notification_service.get_All_Notification()
    ])
    .pipe(
      filter(([subjects, notifications]) => !!subjects && !!notifications),
      map(([subjects, notifications]) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const filteredNotifications = notifications.filter(n =>
          subjects?.some(s => s.name === n.subjectName)
        );

        filteredNotifications.forEach((notification) => {
          const notificationDate = new Date(notification.time);
          if (notificationDate < oneWeekAgo) {
            this.notification_service.DeleteNotification(notification).subscribe(() => {
              console.log(`Notification deleted: ${notification.subjectName}`);
            });
          }
        });

        return filteredNotifications.filter(n => new Date(n.time) >= oneWeekAgo);
      })
    )
    .subscribe((filteredNotifications) => {
      if (filteredNotifications.length > 0) {
        this.notification = filteredNotifications;
        console.log(this.notification);
      } else {
        console.log("There are no notifications");
        this.massege = 'There are no notifications';
        this.notification = [];
      }
    });
}
delete(notification:Notification){
if(confirm('sure this delete')){
  this.notification_service.DeleteNotification(notification).subscribe(() => {
    // تحديث القائمة فور الحذف بدون تحديث الصفحة
    this.notification = this.notification.filter(n => n.id !== notification.id);
  });
}
}
back(){
  this.location.back();
}
}
