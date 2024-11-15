import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  deviceId=localStorage.getItem('deviceId')||uuidv4();
  notifications:any[] = [];
  
  constructor(
    private db:DataService,
    private toastController:ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.db.getNotificationsByDeviceId(this.deviceId).subscribe((data)=>{
      this.notifications=data;
    });
    this.db.checkNewNotification(this.deviceId).subscribe((newNotification)=>{
      if(newNotification.length>0){
        this.showToast('Bạn có thông báo mới');
      }
    });
  }
  async showToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:2000,
      position:'top'
    });
    toast.present();
  }
  clearNotification(){
    this.db.removeNotificationById(this.deviceId).then(
      (response)=>{
        console.log("Đã dọn dẹp thông báo ",response);
      }
    )
    .catch(
      (error)=>{
        console.log("không thể xóa thông báo ",error);
      }
    )
  }
  navigationHome()
  {
    this.router.navigate(['/tabs/home']);
  }
} 
