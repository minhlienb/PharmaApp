import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressSelectorPage } from './address-selector.page';

const routes: Routes = [
  {
    path: '',
    component: AddressSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressSelectorPageRoutingModule {}
