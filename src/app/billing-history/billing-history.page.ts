import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.page.html',
  styleUrls: ['./billing-history.page.scss'],
})
export class BillingHistoryPage {
  billingHistory = [ // thêm một bảng billing History vào trong CSDL
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
  ];


  // Đánh giá đơn hàng: 
  rateOrder(orderId: number) { 
    console.log('Đánh giá cho đơn hàng ID:', orderId);
    // thêm đánh giá từ userid vào id đơn hàng
  }

  // Mua lại đơn hàng
  reorder(orderId: number) {
    console.log('Mua lại đơn hàng ID:', orderId);
    // Lấy thông tin của tất cả sản phẩm trong hóa đơn rồi thêm vào trong giỏ hàng
  }
}