import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.page.html',
  styleUrls: ['./billing-history.page.scss'],
})
export class BillingHistoryPage implements OnInit {
  billingHistory: any[] = []; // lưu trữ danh sách đơn hàng từ cơ sở dữ liệu

  constructor(
    private router: Router,
    private db: DataService
  ) {}

  ngOnInit() {
    const deviceId = localStorage.getItem('deviceId'); // Lấy UID từ localStorage
    if (deviceId) {
      this.db.getOrderDetails(deviceId).subscribe((data) => {
        this.billingHistory = data.map(order => ({
          hoaDon: order.orderId,
          thanhTien: order.totalAmount,
          ngayMua: new Date(order.createAt).toLocaleDateString('vi-VN'), 
          danhGia: 0,
          products: order.products // Lưu lại danh sách sản phẩm
        }));
        console.log('Billing History:', this.billingHistory); // Đảm bảo có dữ liệu
      });
    }
  }

  // Đánh giá đơn hàng
  rateOrder(orderId: number) {
    console.log('Đánh giá cho đơn hàng ID:', orderId);
  }

  // Mua lại đơn hàng
  reorder(order: any) {
    // Kiểm tra xem order có chứa sản phẩm không
    if (!order.products || order.products.length === 0) {
      console.error('Không có sản phẩm trong đơn hàng:', order);
      return; // Dừng lại nếu không có sản phẩm
    }

    const selectedProducts = order.products; // Lấy danh sách sản phẩm từ đơn hàng
    const totalAmount = order.thanhTien; // Lấy tổng số tiền từ đơn hàng

    console.log('Selected Products:', selectedProducts); // Kiểm tra sản phẩm được chọn
    console.log('Total Amount:', totalAmount); // Kiểm tra tổng giá trị

    // Điều hướng đến trang order-confirmation với các tham số đã chọn
    this.router.navigate(['/order-confirmation'], {
      queryParams: {
        products: JSON.stringify(selectedProducts), // Chuyển đổi danh sách sản phẩm thành chuỗi JSON
        totalAmount: totalAmount // Sử dụng tổng số tiền
      }
    });
  }

  // Điều hướng về trang Home
  navigationHome() {
    this.router.navigate(['tabs/home']);
  }
}
