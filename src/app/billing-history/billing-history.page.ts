import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RatingPopupComponent } from '../components/rating-popup/rating-popup.component';

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
  constructor(private modalCtrl: ModalController) {}


  async rateOrder(orderId: number) {
    const modal = await this.modalCtrl.create({
      component: RatingPopupComponent,
      componentProps: { orderId: orderId },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('User Rating:', result.data.rating);
        // Cập nhật đánh giá của đơn hàng trong hệ thống của bạn
        const order = this.billingHistory.find(o => o.id === orderId);
        if (order) {
          order.danhGia = result.data.rating;
        }
      }
    });

    await modal.present();
  }

  reorder(orderId: number) {
    console.log("Reordering order with ID:", orderId);
    // Xử lý logic mua lại đơn hàng
  }
}