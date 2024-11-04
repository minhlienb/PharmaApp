import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { Database, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  userData: any = {
    fullName: '',
    email: '',
    password: '',
    telephone: '',
    address: {},
  }

  constructor(private auth: AuthService, private alert: AlertController, private db: Database, private toast: ToastController, private route: Router) { }

  async ngOnInit() {
    await this.fetchUserData();
  }

  private async fetchUserData() {
    const storedUserData = localStorage.getItem('deviceId');
    // console.log(typeof (storedUserData));

    if (storedUserData) {
      // const { uid } = JSON.parse(storedUserData);
      // console.log(uid);

      const user = await this.auth.getUser(storedUserData)
      // console.log(user);
      if (user) {
        this.userData = {
          fullName: user.fullName || '',
          email: user.email || '',
          password: user.password || '',
          telephone: user.telephone || '',
          address: user.address || {}
        };
        // console.log(JSON.stringify(user.address));
        // console.log(user);
      }
    }
  }
  getAddressList() {
    return Object.keys(this.userData.address)
  }

  async addAddress() {
    const alert = await this.alert.create({
      header: "Enter new address",
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Enter title'
        },
        {
          name: 'content',
          type: 'text',
          placeholder: 'Enter new address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Canceled');
          }
        },
        {
          text: 'Add',
          handler: (data) => {
            this.saveAddress(data.title, data.content)
          }
        }
      ]
    })
    await alert.present()
  }

  async saveAddress(title: string, content: string) {
    const newAddKey = uuidv4()
    const newAddress = { title, content }
    this.userData.address[newAddKey] = { title, content }
    const storedUser = localStorage.getItem('deviceId')
    if (storedUser) {
      const userRef = await ref(this.db, `users/${storedUser}/address/${newAddKey}`)
      try {
        await set(userRef, newAddress)
        const toast = await this.toast.create({
          message: 'Add address successfully',
          duration: 1000,
          color: 'success',
          position: 'middle'
        })
        await toast.present()
      } catch (error) {
        console.error(error);

        const toast = await this.toast.create({
          message: "Something went wrong",
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    }
  }

  async updateUser() {
    try {
      const storedUserId = localStorage.getItem('deviceId');
      if (!storedUserId) {
        console.error('ID not found');
        return;
      }
      const dataToUpdate = {
        fullName: this.userData.fullName,
        email: this.userData.email,
        telephone: this.userData.telephone,
        password: this.userData.password || undefined
      }
      await this.auth.update(storedUserId, dataToUpdate)
      this.userData.password = ''
      await this.route.navigate(['/tabs/profile'])
    } catch (error) {
      console.error('Error updating user info', error);
    }
  }
}
