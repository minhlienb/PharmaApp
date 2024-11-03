import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  
  UpdateProfile() {
    let error = 1;
    if (error) {
      this.presentAlerts("Thông báo thành công/Lỗi sai thông tin, sai mật khẩu, mật khẩu không khớp, mật khẩu quá ngắn, ...");
    }
  }

  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
