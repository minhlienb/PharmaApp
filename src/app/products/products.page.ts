import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { ProductServiceService } from '../services/Product/product.service.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  // Dữ liệu JSON
  products = [
    {
      title: 'Khẩu trang N95',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is some content inside a card.'
    },
    {
      title: 'Khẩu trang y tế',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is another type of mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    },
    {
      title: 'Khẩu trang vải',
      imageUrl: 'assets/khauTrangN95.jpg',
      description: 'This is a cloth mask.'
    }
  ];
  constructor(private productService: ProductServiceService) { }



  async ngOnInit() {
    this.products = await this.productService.getList();
    console.log(this.products);
  }

}
