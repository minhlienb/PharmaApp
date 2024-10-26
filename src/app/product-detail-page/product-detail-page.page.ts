import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  productId:string|null=null;
  productData:any;
  quantity:number=1;
  
  constructor(
    private router:ActivatedRoute,
    private db:AngularFireDatabase,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.productId=this.router.snapshot.paramMap.get('productId');
    if(this.productId){
      this.getProductData(this.productId);
    }
  }
  getProductData(productId:string){
    const productRef=this.db.object(`products/${productId}`);
    productRef.valueChanges().subscribe((data)=>{
        this.productData=data;
        console.log("Product Data:", this.productData);
    })
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  async presentAlerts(message: string) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async AddToCart() {
    let deviceId =localStorage.getItem('deviceId');
    if(!deviceId){
      deviceId=uuidv4();
      localStorage.setItem('deviceId',deviceId);
    }
    const cartData={
      name:this.productData.title,
      category:this.productData.type,
      price:this.productData.price,
      quantity:this.quantity
    };
    if(!this.productData){
      this.presentAlerts('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }
    const productPath=`cart/${deviceId}/${this.productId}`;
    const productRef =this.db.object(productPath);
    try{
      productRef.snapshotChanges().pipe(take(1)).subscribe(async (snapshot)=>{
        const item=snapshot.payload.val() as {quantity:number}|null;
        if(item){
          const updateQuantity=item.quantity+this.quantity;
          await productRef.update({quantity:updateQuantity});
          this.presentAlerts("Sản phẩm đã được cập nhật trong giỏ hàng");
          return;
        }
        else{
          await productRef.set(cartData);
          this.presentAlerts('Đã thêm vào giỏ hàng!');
          return;
        }
      });
      
    }
    catch (error) {
      console.error('Error adding to cart: ', error);
      this.presentAlerts('Có lỗi xảy ra. Vui lòng thử lại.');
    }

  }

}
