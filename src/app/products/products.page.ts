import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  products: any[] = [];

  constructor(
    private dataService: DataService
  ) {
    
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
}
