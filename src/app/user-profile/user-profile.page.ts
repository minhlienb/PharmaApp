import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { Database } from '@angular/fire/database';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData: any = {
    uid: '',
    fullName: ''
  }
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { uid } = JSON.parse(storedUserData);
      const user = await this.auth.getUser(uid)
      if (user) {
        this.userData = {
          uid: user.uid,
          fullName: user.fullName || '',
        };
      }
    }

  }
  async signOut() {
    return await this.auth.logout()
  }
}
