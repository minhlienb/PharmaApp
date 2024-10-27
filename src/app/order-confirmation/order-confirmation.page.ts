import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressSelectorPage } from '../address-selector/address-selector.page';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage {
  selectedAddress: string = '';
  selectedDeliveryService: string = '';
  totalAmount: number = 185.00;  // Ví dụ giá trị tổng của đơn hàng

  constructor(private modalController: ModalController) {}

  // Mở popup chọn địa chỉ và dịch vụ vận chuyển
  async openAddressSelector() {
    const modal = await this.modalController.create({
      component: AddressSelectorPage
    });

    // Xử lý dữ liệu khi modal đóng lại
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedAddress = data.data.address;
        this.selectedDeliveryService = data.data.deliveryService;
      }
    });

    await modal.present();
  }

  // Xác nhận đơn hàng và thực hiện các hành động khác
  confirmOrder() {
    console.log('Order confirmed with address:', this.selectedAddress);
    console.log('Delivery service selected:', this.selectedDeliveryService);
    // Ở đây, bạn có thể thực hiện các thao tác tiếp theo, ví dụ như gọi API để đặt hàng
  }
}