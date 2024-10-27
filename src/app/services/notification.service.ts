import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private deviceId:string;

  currentMessage=new BehaviorSubject<any>(null);

  constructor(
    private db: AngularFireDatabase
  ) {
    this.deviceId=localStorage.getItem('deviceId')||uuidv4();
    localStorage.setItem('deviceId', this.deviceId);
    this.listenForNotifications();
  }

 
  listenForNotifications(){
    this.db.object(`notifications/${this.deviceId}`).snapshotChanges().subscribe(notification => {
      const data = notification.payload.val();
      if (data) {
        this.handleFCMNotification(data);
      }
    });
  }

  showNotification(notification: any) {
    const { title, content } = notification;
    const options = {
      body: content,
      icon: 'assets/icon/favicon.png'
    };
    new Notification(title, options);
  }
  
  handleFCMNotification(notification:any){
    const { title, body } = notification.notification || { title: '', body: '' };
    if (title && body) {
      const options = {
        body: body,
        icon: 'assets/icon/favicon.png'
      };
      new Notification(title, options);
    }
  }
  addNotification(title: string, content: string) {
    const notificationId = uuidv4();
    const notificationData = { title, content };
    // Lưu thông báo vào Realtime Database
    this.db.object(`notifications/${this.deviceId}/${notificationId}`).set(notificationData);
  }
}
