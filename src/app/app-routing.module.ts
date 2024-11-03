import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-detail-page/:productId', 
    loadChildren: () => import('./product-detail-page/product-detail-page.module').then(m => m.ProductDetailPagePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'address-selector',
    loadChildren: () => import('./address-selector/address-selector.module').then( m => m.AddressSelectorPageModule)
  },
  {
    path: 'billing-history',
    loadChildren: () => import('./billing-history/billing-history.module').then( m => m.BillingHistoryPageModule)
  },
  {
    path: 'invoice-detail',
    loadChildren: () => import('./invoice-detail/invoice-detail.module').then( m => m.InvoiceDetailPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
