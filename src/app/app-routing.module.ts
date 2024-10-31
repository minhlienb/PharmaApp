import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([''])
// const redirectLoggedInToTabs = () => redirectLoggedInTo('tabs/home')
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Page/Login/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'product-detail-page/:productId', 
    loadChildren: () => import('./product-detail-page/product-detail-page.module').then(m => m.ProductDetailPagePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Page/Register/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Page/tab-bar/tab-bar.module').then(m => m.TabBarPageModule),
    // ...canActivate(redirectUnauthorizedToLogin)
    // canActivate: [AuthGuard]
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
