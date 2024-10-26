import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  

  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() productId: string = '';  
  @Input() type: string = '';
  @Input() price: string = '';
  @Input() quantity: string = '';

  constructor(
    private alertController: AlertController,
    private db:AngularFireDatabase,
    private router:Router

  ) { }

  ngOnInit() { }

  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async navigateToDetailPage() {
    // Điều hướng đến trang chi tiết sản phẩm kèm theo productId
    this.router.navigate(['/product-detail-page', this.productId]);
  }

  async AddToCart() {
    // const db = getDatabase();
    const deviceId = uuidv4(); 
    const productData = {
        name: this.title,
        category: this.type,
        price: this.price,
        quantity: 1
    };

    if (!this.title || !this.type || !this.price || !this.quantity) {
        this.presentAlerts('Vui lòng điền đầy đủ thông tin sản phẩm.');
        return;
    }
    const productPath = `cart/${deviceId}/${this.productId}`;
    try {
        await this.db.object(productPath).set(productData);
        this.presentAlerts('Đã thêm vào giỏ hàng!');
    } catch (error) {
        console.error('Error adding to cart: ', error);
        this.presentAlerts('Có lỗi xảy ra. Vui lòng thử lại.');
    }
}
}