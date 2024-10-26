import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // Khởi tạo danh sách sản phẩm
  products = [
    { name: 'Sản phẩm 1', category: 'Phân loại 1', price: 25, quantity: 1 },
    { name: 'Sản phẩm 2', category: 'Phân loại 2', price: 25, quantity: 1 },
  ];

  discount = 0; // Giả sử không có giảm giá

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
}
