import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    private db: AngularFireDatabase,
    private router: Router

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
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem('deviceId', deviceId);
    }
    const productData = {
      name: this.title,
      category: this.type,
      price: this.price,
      quantity: 1
    };
    if (!this.title || !this.type || !this.price || !this.price) {
      this.presentAlerts('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }
    const productPath = `cart/${deviceId}/${this.productId}`;
    const productRef = this.db.object(productPath);
    try {
      productRef.snapshotChanges().pipe(take(1)).subscribe(async (snapshot) => {
        const item=snapshot.payload.val() as {quantity:number}|null;
        if (item) {
          const updateQuantity = item.quantity + 1;
          await productRef.update({ quantity: updateQuantity });
          this.presentAlerts("Sản phẩm đã được cập nhật trong giỏ hàng");
          return;
        }
        else {
          await productRef.set(productData);
          this.presentAlerts('Đã thêm vào giỏ hàng!');
          return;
        }
      });
    } catch (error) {
      console.error('Error adding to cart: ', error);
      this.presentAlerts('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  }
}