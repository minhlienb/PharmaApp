import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.page.html',
  styleUrls: ['./billing-history.page.scss'],
})
export class BillingHistoryPage {
  billingHistory = [
    {
      id: 1,
      hoaDon: 'HD123456',
      thanhTien: '500,000 VND',
      danhGia: 4,  // out of 5 stars
      ngayMua: '01-10-2023',
    },
    {
      id: 2,
      hoaDon: 'HD123457',
      thanhTien: '300,000 VND',
      danhGia: 5,  // out of 5 stars
      ngayMua: '15-09-2023',
    },
    // Add more items here as needed
  ];

  rateOrder(orderId: number) {
    // Navigate to rating page or perform rating action here
    console.log('Đánh giá cho đơn hàng ID:', orderId);
  }

  reorder(orderId: number) {
    // Perform reorder action here
    console.log('Mua lại đơn hàng ID:', orderId);
  }
}