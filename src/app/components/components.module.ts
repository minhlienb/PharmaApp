// src/app/components/components.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';
import { RatingPopupComponent } from './rating-popup/rating-popup.component'; // Đảm bảo đường dẫn đúng
import { AddressListComponent } from './address-list/address-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    ProductCardComponent,
    RatingPopupComponent,
    AddressListComponent // Đảm bảo rằng component được khai báo ở đây
  ],
  exports: [
    ProductCardComponent,
    RatingPopupComponent,
    AddressListComponent // Xuất khẩu để sử dụng ở các module khác
  ]
})
export class ComponentsModule { }
