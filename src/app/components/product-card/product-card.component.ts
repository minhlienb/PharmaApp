import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async sayLovelyWord() {
    console.log("Fuck You 🖕");
  }

  async AddToCart() {
    const alert = await this.alertController.create({
      header: 'Mua hàng',
      message: "Đã thêm vào giỏ hàng, thực ra là chưa",
      buttons: ['OK!!!'],
    });
    await alert.present();
  }
}
