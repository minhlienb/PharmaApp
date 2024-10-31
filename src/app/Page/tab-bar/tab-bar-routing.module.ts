import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBarPage } from './tab-bar.page';


const routes: Routes = [
  {
    path: '',
    component: TabBarPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../../notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path:'cart',
        loadChildren:()=>import('../../cart/cart.module').then(m=>m.CartPageModule)
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfilePageModule)
          },
          {
            path: 'info',
            loadChildren: () => import('../../Page/userdetails/userdetails.module').then(m => m.UserdetailsPageModule)
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () => import('../../products/products.module').then(m => m.ProductsPageModule)
          },
          {
            path: 'detail',
            loadChildren: () => import('../../product-detail-page/product-detail-page.module').then(m => m.ProductDetailPagePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarPageRoutingModule { }
