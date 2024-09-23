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
  constructor() {
    addIcons({ library, playCircle, radio, search });
  }
}
