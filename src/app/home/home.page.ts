
import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories = [
    { label: 'Não', icon: 'restaurant-outline' },
    { label: 'Tiêu hóa', icon: 'restaurant-outline' },
    { label: 'Xương', icon: 'body-outline' },
    { label: 'Mắt', icon: 'eye-outline' }
  ];

  products: any[] = [];

  constructor(
    private dataService: DataService
  ) {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }


}
