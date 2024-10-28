import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingHistoryPageRoutingModule } from './billing-history-routing.module';

import { BillingHistoryPage } from './billing-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingHistoryPageRoutingModule
  ],
  declarations: [BillingHistoryPage]
})
export class BillingHistoryPageModule {}
