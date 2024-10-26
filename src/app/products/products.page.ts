import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DataService } from '../services/data.service';
=======
import { Database, ref, get } from '@angular/fire/database';
import { ProductServiceService } from '../services/Product/product.service.service';
>>>>>>> main
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
