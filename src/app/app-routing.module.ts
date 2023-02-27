import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ItemComponent } from './admin/item/item.component';
import { OrderComponent } from './admin/order/order.component';
import { UserComponent } from './admin/user/user.component';
import { LoginComponent } from './login/login.component';
import { MyorderComponent } from './shopping/myorder/myorder.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { FailedComponent } from './result/failed/failed.component';
import { NotfoundComponent } from './result/notfound/notfound.component';
import { SuccessComponent } from './result/success/success.component';
import { UnauthComponent } from './result/unauth/unauth.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AllComponent } from './shopping/all/all.component';
import { ItemCardComponent } from './shopping/item-card/item-card.component';
import { FreshComponent } from './shopping/fresh/fresh.component';
import { GroceryComponent } from './shopping/grocery/grocery.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { LoadingComponent } from './loading/loading.component';
import { TransportComponent } from './admin/transport/transport.component';
import { TransInComponent } from './admin/trans-in/trans-in.component';
import { StockComponent } from './admin/stock/stock.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/loading'},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'register', pathMatch: 'full', component: RegisterComponent},
  {path: 'failed', pathMatch: 'full', component: FailedComponent},
  {path: 'success', pathMatch: 'full', component: SuccessComponent},
  {path: 'unauth', pathMatch: 'full', component: UnauthComponent},
  {path: 'loading', pathMatch: 'full', component: LoadingComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'profile'},
      {path: 'user', component: UserComponent},
      {path: 'item', component: ItemComponent},
      {path: 'order', component: OrderComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'failed', component: FailedComponent},
      {path: 'success', component: SuccessComponent},
      {path: 'unauth', component: UnauthComponent},
      {path: 'transport', component: TransportComponent},
      {path: 'trans-in', component: TransInComponent},
      {path: 'stock', component: StockComponent},
      {path: '**', pathMatch: 'full', component: NotfoundComponent}
    ],
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'all'},
      {path: 'all', component: AllComponent},
      {path: 'item', component: ItemCardComponent},
      {path: 'myorder', component: MyorderComponent},
      {path: 'fresh', component: FreshComponent},
      {path: 'grocery', component: GroceryComponent},
      {path: 'cart', component: CartComponent},
      {path: 'user-info', component: ProfileComponent},
      {path: 'checkout/:id', component: CheckoutComponent}
    ]
  },
  {path: '**', pathMatch: 'full', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
