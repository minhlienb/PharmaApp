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
    // ...canActivate(redirectLoggedInToTabs)
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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
