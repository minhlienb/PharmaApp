import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any[] = [];
  discount = 0; // Giả sử không có giảm giá

  constructor(
    private db: AngularFireDatabase,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCartData();
  }
  loadCartData() {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId) {
      this.db.list(`cart/${deviceId}`).snapshotChanges().subscribe((data: any[]) => {
        this.products = data.map((item: any) => ({
          productId: item.key,
          ...item.payload.val(),
          selected: false
        }));
      });
    }
  }

  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  // Hàm tăng số lượng sản phẩm
  increaseQuantity(index: number) {
    this.products[index].quantity++;
  }

  // Hàm giảm số lượng sản phẩm
  decreaseQuantity(index: number) {
    if (this.products[index].quantity > 1) {
      this.products[index].quantity--;
    }
  }

  // Tính tổng hóa đơn
  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }
  async Pay() {
      const selectedProducts = this.products.filter(item => item.selected);
      if (selectedProducts.length === 0) {
        await this.presentAlerts("Bạn phải chọn ít nhất một sản phẩm để thanh toán.");
        return;
      }
    this.router.navigate(['/order-confirmation'], { queryParams: { products:JSON.stringify(selectedProducts),totalAmount:this.getTotalPrice } });
  }
  removeSelectItem() {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId) {
      const selectedProducts = this.products.filter(item => item.selected);
      selectedProducts.forEach(item => {
        this.db.list(`cart/${deviceId}`).remove(item.productId).then(() => {
          console.log(`Đã xóa sản phẩm: ${item.name}`);
        }).catch(error => {
          console.error(`Không thể xóa sản phẩm: ${error}`);
        });
      });
      this.presentAlerts("Đã xóa các sản phẩm khỏi giỏ hàng");
      this.loadCartData();
    }
  }
  hasSelectedProduct(): boolean {
    return this.products.some(item => item.selected);
  }
  navigateToProducts() {
    this.router.navigate(['/products']);
  }

}
