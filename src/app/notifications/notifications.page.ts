import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  // Dữ liệu JSON
  notifications = [
    {
      title: 'Đơn hàng',
      content: 'Đặt hàng thành công'
    },
    {
      title: 'Khuyến mãi',
      content: 'Giảm 1000đ cho 2 bịch tăm bông'
    },
  ]

  constructor() { }

  ngOnInit() {
  }
} 