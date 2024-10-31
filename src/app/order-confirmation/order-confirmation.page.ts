import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressSelectorPage } from '../address-selector/address-selector.page';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
  selectedProducts: any[] = [];
  addresses: any[] = [];
  telephone: string = '';
  selectedAddress: any = null;
  totalAmount: number = 0;
  orderId: string = '';
  createdAt: string = '';
  status: string = '';
  deviceId: string = localStorage.getItem('deviceId') || '';

  constructor(
    private modalController: ModalController,
    private router: Router,
    private db: DataService
  ) {}

  ngOnInit() {
    // Lấy dữ liệu đơn hàng từ history.state
    const orderData = history.state;
    console.log('orderData from order-confirm ',orderData);
    if (orderData) {
      this.orderId = orderData.orderId;
      this.createdAt = orderData.createdAt;
      this.status = orderData.status;
      this.totalAmount = orderData.totalAmount;
      this.deviceId = orderData.deviceId;
      this.selectedProducts = orderData.selectedProducts || [];
    }
    

    // Lấy thông tin người dùng từ DataService
    this.db.getUserInfo(this.deviceId).subscribe((userInfo: any) => {
      this.addresses = userInfo.addresses;
      this.telephone = userInfo.telephone;
      this.selectedAddress = this.addresses.length ? this.addresses[0] : null;
      console.log('Địa chỉ:', this.addresses);
      console.log('Số điện thoại:', this.telephone);
    });
  }


   // Hàm tăng số lượng sản phẩm
   increaseQuantity(index: number) {
    this.selectedProducts[index].quantity++;
  }

  // Hàm giảm số lượng sản phẩm
  decreaseQuantity(index: number) {
    if (this.selectedProducts[index].quantity > 1) {
      this.selectedProducts[index].quantity--;
    }
  }

  // Tính tổng hóa đơn
  getTotalPrice(): number {
    return this.selectedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }

  // Hàm mở modal chọn địa chỉ giao hàng
  async openAddressSelector() {
    const modal = await this.modalController.create({
      component: AddressSelectorPage,
      componentProps: { addresses: this.addresses }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedAddress = data.data.selectedAddress;
      }
    });

    await modal.present();
  }

  confirmOrder() {
    console.log('Order confirmed with address:', this.selectedAddress);
    console.log('Delivery service selected:', this.telephone);
  }
}
