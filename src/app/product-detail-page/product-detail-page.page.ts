import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  images = [
    'assets/khauTrangN95.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    // Thêm nhiều hình ảnh ở đây
  ];
  constructor() { }

  ngOnInit() {
  }

}
