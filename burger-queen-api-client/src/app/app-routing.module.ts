import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './view/login.view/loginView';
import { OrderViewComponent } from './view/order.view/orderView';
import { KitchenViewComponent } from './view/kitchen.view/kitchen.view.component';
import { ReadyOrdersViewComponent } from './view/ready-orders.view/ready-orders.view.component';
const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginViewComponent
    },
    {
      path: 'orders',
      component: OrderViewComponent
    },
    {
      path:'kitchen',
      component:KitchenViewComponent 
    },
    {
      path:'readyOrders',
      component:ReadyOrdersViewComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }