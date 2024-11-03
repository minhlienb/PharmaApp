import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { RatingPopupComponent } from '../components/rating-popup/rating-popup.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.page.html',
  styleUrls: ['./billing-history.page.scss'],
})
export class BillingHistoryPage implements OnInit {
  billingHistory: any[] = []; // Lưu trữ danh sách đơn hàng từ cơ sở dữ liệu
  deviceId: string; // Khai báo deviceId

  constructor(
    private router: Router,
    private db: DataService,
    private modalCtrl: ModalController
  ) {
    // Lấy UID từ localStorage hoặc tạo mới nếu không có
    this.deviceId = localStorage.getItem('deviceId') || uuidv4();
  }

  ngOnInit() {
    if (this.deviceId) { // Sử dụng this.deviceId
      this.db.getOrderDetails(this.deviceId).subscribe((data) => {
        this.billingHistory = data.map(order => ({
          hoaDon: order.orderId,
          thanhTien: order.totalAmount,
          ngayMua: new Date(order.createAt).toLocaleDateString('vi-VN'),
          danhGia: order.rating||0, // Lấy đánh giá từ cơ sở dữ liệu nếu có
          products: order.products // Lưu lại danh sách sản phẩm
        }));
        console.log('Billing History:', this.billingHistory); // Đảm bảo có dữ liệu
      });
    }
  }

  // Mua lại đơn hàng
  reorder(order: any) {
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

  async rateOrder(order: any) {
    const modal = await this.modalCtrl.create({
      component: RatingPopupComponent,
      componentProps: { orderId: { hoaDon: order.hoaDon }, deviceId: this.deviceId }, // Truyền đúng kiểu
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('User Rating:', result.data.rating);
        const orderItem = this.billingHistory.find(o => o.hoaDon === order.hoaDon);
        if (orderItem) {
          orderItem.danhGia = result.data.rating;
        }
      }
    });

    await modal.present();
  }

  // Điều hướng về trang Home
  navigationHome() {
    this.router.navigate(['tabs/home']);
  }

  navigationInvoiceDetail(orderId: string) {
    this.router.navigate(['/invoice-detail', orderId]); // Sử dụng cú pháp này
  }
}
