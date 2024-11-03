import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  fullName: string = "";
  email: string = "";
  password: string = '';
  telephone: string = "";
  addressTitle: string = ""; // Biến cho tiêu đề địa chỉ
  addressContent: string = ""; // Biến cho nội dung địa chỉ

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Khởi tạo các giá trị nếu cần
  }

  register() {
    // Tạo đối tượng địa chỉ với tiêu đề và nội dung
    const address = {
      title: "Mặc định",
      content: this.addressContent
    };

    // Gọi hàm register với thông tin địa chỉ
    return this.authService.register(this.fullName, this.email, this.password, this.telephone, address);
  }
}
