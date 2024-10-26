import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  categories = [
    { label: 'Não', icon: 'restaurant-outline' },
    { label: 'Tiêu hóa', icon: 'restaurant-outline' },
    { label: 'Xương', icon: 'body-outline' },
    { label: 'Mắt', icon: 'eye-outline' }
  ];

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
  constructor() {
    addIcons({ library, playCircle, radio, search });
  }
}
