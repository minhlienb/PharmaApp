import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.scss'],
})
export class RatingPopupComponent {
  @Input() orderId!: { hoaDon: string }; // Đảm bảo kiểu dữ liệu đúng
  @Input() deviceId!: string; // Lưu deviceId
  rating: number = 0;

  constructor(private modalCtrl: ModalController, private db: DataService) {}

  setRating(star: number) {
    this.rating = star; // Cập nhật đánh giá theo số sao
  }

  submitRating() {
    this.modalCtrl.dismiss({ rating: this.rating });
    this.db.submitRating(this.deviceId, this.orderId.hoaDon, this.rating)
      .then(() => {
        console.log('Rating saved in the database.');
      })
      .catch(() => {
        console.error('Error saving rating:');
      });
  }

  dismiss() {
    this.modalCtrl.dismiss(); // Đóng modal
  }
}
