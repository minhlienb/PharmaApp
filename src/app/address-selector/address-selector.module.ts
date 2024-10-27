import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressSelectorPageRoutingModule } from './address-selector-routing.module';

import { AddressSelectorPage } from './address-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressSelectorPageRoutingModule
  ],
  declarations: [AddressSelectorPage]
})
export class AddressSelectorPageModule {}
