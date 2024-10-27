import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.page.html',
  styleUrls: ['./address-selector.page.scss'],
})
export class AddressSelectorPage {
  selectedAddress: string = 'home';
  selectedDeliveryService: string = 'tiki-now';

  constructor(private modalController: ModalController) {}

  // Hàm xử lý khi người dùng chọn một địa chỉ
  async selectAddress(address: string) {
    this.selectedAddress = address;
    this.closeModal();
  }

  // Hàm xử lý khi người dùng chọn dịch vụ giao hàng
  async selectDeliveryService(service: string) {
    this.selectedDeliveryService = service;
    this.closeModal();
  }

  // Đóng modal và trả lại thông tin địa chỉ và dịch vụ giao hàng đã chọn
  async closeModal() {
    await this.modalController.dismiss({
      address: this.selectedAddress,
      deliveryService: this.selectedDeliveryService
    });
  }
}