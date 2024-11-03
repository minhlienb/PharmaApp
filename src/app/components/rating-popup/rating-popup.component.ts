import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Input } from '@angular/core';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.scss'],
})

export class RatingPopupComponent {
  @Input()
  orderId!: number;
  rating: number = 0;

  constructor(private modalCtrl: ModalController) {}

  setRating(star: number) {
    this.rating = star;
  }

  submitRating() {
    this.modalCtrl.dismiss({ rating: this.rating });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}