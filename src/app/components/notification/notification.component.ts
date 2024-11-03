import { Component, input, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent  implements OnInit {
  @Input() title?: string;
  @Input() content?: string;
  @Input() deviceId?:string;
  @Input() notificationId?:string;
  @Input() status?:boolean;
  
  constructor(
    private db:DataService
  ) { }

  ngOnInit() {}
  onNotificationClick(){
    if(this.status===false){
      this.status=true;
    }
    if(this.deviceId&&this.notificationId){
      this.db.updateNotificationStatus(this.deviceId,this.notificationId,true,false);
    }
  }
}
