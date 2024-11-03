import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { FCM } from '@capacitor-community/fcm';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private deviceId: string;
  currentMessage = new BehaviorSubject<any>(null);

  constructor(
    private db: DataService
  ) {
    // Khởi tạo deviceId và lưu vào localStorage nếu chưa có
    this.deviceId = localStorage.getItem('deviceId') || uuidv4();
    localStorage.setItem('deviceId', this.deviceId);

    this.requestPermission();
    this.listenForDatabaseNotifications();
  }

  async requestPermission() {
    try {
      const { token } = await FCM.getToken();
      console.log('FCM Token:', token);
      // Gửi token này lên server nếu cần để sử dụng cho các yêu cầu FCM tiếp theo
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  }

  listenForDatabaseNotifications() {
    this.db.checkNewNotification(this.deviceId).subscribe(ds=>{
      ds.forEach(item=>{
        const notification=item.payload.val();
        this.sendPushNotification(notification);
        if(notification.key){
          this.db.updateNotificationStatus(this.deviceId, notification.key, true, false);
        }
      })
    })
  }

  async sendPushNotification(notification: any) {
    try {
      const { title, content } = notification;
      const payload = {
        notification: {
          title: title,
          body: content,
          icon: 'assets/icon/favicon.png'
        }
      };
      this.currentMessage.next(payload);
      console.log('Push Notification:', payload);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
