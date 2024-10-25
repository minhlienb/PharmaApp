import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getDatabase, ref, set } from 'firebase/database'; 
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() productId: string = '';  // Nhận productId từ parent component
  @Input() type: string = '';
  @Input() price: string = '';
  @Input() quantity: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async AddToCart() {
    const db = getDatabase();
    const deviceId = uuidv4(); 
    const productData = {
        name: this.title,
        category: this.type,
        price: this.price,
        quantity: this.quantity
    };

    if (!this.title || !this.type || !this.price || !this.quantity) {
        this.presentAlerts('Vui lòng điền đầy đủ thông tin sản phẩm.');
        return;
    }

    const productRef = ref(db, 'cart/' + deviceId + '/' + this.productId);
    try {
        await set(productRef, productData);
        this.presentAlerts('Đã thêm vào giỏ hàng!');
    } catch (error) {
        console.error('Error adding to cart: ', error);
        this.presentAlerts('Có lỗi xảy ra. Vui lòng thử lại.');
    }
}
}