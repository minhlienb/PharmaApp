import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
