import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.page.html',
  styleUrls: ['./address-selector.page.scss'],
})
export class AddressSelectorPage {
  selectedAddress: any = null; // Cập nhật để phù hợp với đối tượng địa chỉ
  address: any[] = []; // Danh sách địa chỉ sẽ được truyền từ component cha

  constructor(private modalController: ModalController) {}

  // Hàm để chọn địa chỉ
  async selectAddress(address: any) {
    this.selectedAddress = address;
    this.closeModal();
  }

  // Đóng modal và trả lại thông tin địa chỉ đã chọn
  async closeModal() {
    await this.modalController.dismiss({
      address: this.selectedAddress
    });
  }
}
