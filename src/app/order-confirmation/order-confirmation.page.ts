import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddressSelectorPage } from '../address-selector/address-selector.page';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
  selectedProduct: any[] = [];
  address: any[] = [];
  telephone: string = '';
  deviceId = "37GXXv56z4fCbjtlvWCdVXMvpqn2";
  selectedAddress: any = null;
  totalAmount: number = 185.00;
  discount = 0;
  constructor(
    private modalController: ModalController,
    private activeRoute: ActivatedRoute,
    private db: DataService,
    private alertController:AlertController,
    private router:Router
  ) {
    if (this.deviceId) {
      localStorage.setItem('deviceId', this.deviceId);
    }
  }

  ngOnInit() {
    this.db.getUserInfo(this.deviceId).subscribe((userInfo: any) => {
      this.address = userInfo.addresses;
      this.telephone = userInfo.telephone;
      if (this.address.length > 0) {
        this.selectedAddress = this.address[0];
      }
    });

    const products = this.activeRoute.snapshot.queryParamMap.get('selectedProducts');
    if (products) {
      this.selectedProduct = JSON.parse(products);
      console.log('product', this.selectedProduct);
    }
  }

  async openAddressSelector() {
    const modal = await this.modalController.create({
      component: AddressSelectorPage,
      componentProps: { address: this.address }
    });

    // Xử lý dữ liệu khi modal đóng lại
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedAddress = data.data.address; 
      }
    });

    await modal.present();
  }
  increaseQuantity(index: number) {
    this.selectedProduct[index].quantity++;
  }

  // Hàm giảm số lượng sản phẩm
  decreaseQuantity(index: number) {
    if (this.selectedProduct[index].quantity > 1) {
      this.selectedProduct[index].quantity--;
    }
  }
  getTotalPrice(): number {
    return this.selectedProduct.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }
  createOrderData() {
    return {
      createAt: new Date().toISOString(),
      address: {
        addressID: this.selectedAddress.key,
        title: this.selectedAddress.title,
        content: this.selectedAddress.content,
      },
      telephone: this.telephone,
      products: this.selectedProduct.map(product => ({
        product: product.productId,
        category: product.category,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        status:'Chờ xử lý',
        paid:false
      }))
    };
  }
  removeProductById(productId: string) {
    this.selectedProduct = this.selectedProduct.filter(product => product.productId !== productId);
  }

  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async confirmOrder() {
    const orderId = uuidv4();
    const orderData = this.createOrderData();
    try {
      await this.db.setOrderByDeviceId(this.deviceId, orderData, orderId); 
      this.presentAlerts("Đơn hàng đã được tạo");
          const notificationData={
            content: `Đơn hàng của ban đang chờ được xử lý.`,
            status: false,
            title: 'Đặt hàng thành công',
            createAt: Date.now(),
            newNotification:true
          }
          const notificationKey=uuidv4();
          this.db.setNotificationsByDeviceId(this.deviceId,notificationKey,notificationData);
      for (const product of this.selectedProduct) {
        await this.db.removeProductInCartById(this.deviceId, product.productId); 
        this.removeProductById(product.productId);
      }
      this.router.navigate(['/billing-history'])
    } catch (error) {
      this.presentAlerts("Không thể tại đơn hàng");
          const notificationData={
            content: `Hiện tại không thể tạo đơn hàng cho bạn.`,
            status: false,
            title: 'Lỗi tạo đơn hàng',
            createAt: Date.now(),
            newNotification:true
          }
          const notificationKey=uuidv4();
          this.db.setNotificationsByDeviceId(this.deviceId,notificationKey,notificationData);
          this.router.navigate(['/cart'])
    }
  }
}