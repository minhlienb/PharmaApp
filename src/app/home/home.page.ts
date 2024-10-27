
import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedCategoryId:string |null=null;
  categories:any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private dataService: DataService,
    private router:Router
  ) {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
    this.dataService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
    this.dataService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts=data;
    });
    
  }
  loadProductByCate(categoriId:string){
    this.dataService.getProductsByCate(categoriId).subscribe((data:any[])=>{
      this.products=data;
      this.filteredProducts=data;
      this.selectedCategoryId = categoriId;
    })
  }
  filterProducts(event:any){
    const searchTerm=event.target.value.toLowerCase();
    if(searchTerm){
      this.filteredProducts=this.products.filter(item=>
        item.title.toLowerCase().includes(searchTerm)
      );
    }
    else{
      this.filteredProducts=this.products;
    }
  }
  navigateToNotification(){
    this.router.navigate(['/notifications']);
  }
  navigateToCart(){
    this.router.navigate(['/cart']);
  }
}
