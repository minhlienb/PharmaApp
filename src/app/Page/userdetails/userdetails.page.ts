import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';


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
    address: '',
  }

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    await this.fetchUserData();
  }

  private async fetchUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { uid } = JSON.parse(storedUserData);
      const user = await this.auth.getUser(uid)
      // console.log(user);
      if (user) {
        this.userData = {
          fullName: user.fullName || '',
          email: user.email || '',
          password: user.password || '',
          telephone: user.telephone || '',
          address: user.address || ''
        };
      }
    }
  }

}
