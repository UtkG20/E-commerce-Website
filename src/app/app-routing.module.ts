import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'create',
    component:CreateAccountComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'home/cart',
    component:CartComponent
  },
  {
    path:'home/wishlist',
    component:WishlistComponent
  },
  {
    path:'home/wishlist/cart',
    component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
