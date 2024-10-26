import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  fullName: string = ""
  email: string = ""
  password: string = ''
  address: string = ""
  telephone: string = ""

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    return this.authService.register(this.fullName, this.email, this.password, this.address, this.telephone)
  }
}
