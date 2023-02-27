import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSpaceModule } from 'ng-zorro-antd/space';
// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemComponent } from './admin/item/item.component';
import { UserComponent } from './admin/user/user.component';
import { OrderComponent } from './admin/order/order.component';
import { SuccessComponent } from './result/success/success.component';
import { UnauthComponent } from './result/unauth/unauth.component';
import { NotfoundComponent } from './result/notfound/notfound.component';
import { FailedComponent } from './result/failed/failed.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { MyorderComponent } from './shopping/myorder/myorder.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AllComponent } from './shopping/all/all.component';
import { ItemCardComponent } from './shopping/item-card/item-card.component';
import { FreshComponent } from './shopping/fresh/fresh.component';
import { GroceryComponent } from './shopping/grocery/grocery.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { TokenInterceptor } from 'src/token.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { TransportComponent } from './admin/transport/transport.component';
import { TransInComponent } from './admin/trans-in/trans-in.component';
import { StockComponent } from './admin/stock/stock.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ItemComponent,
    UserComponent,
    OrderComponent,
    SuccessComponent,
    UnauthComponent,
    NotfoundComponent,
    FailedComponent,
    ProfileComponent,
    MyorderComponent,
    ShoppingComponent,
    AllComponent,
    ItemCardComponent,
    FreshComponent,
    GroceryComponent,
    CartComponent,
    CheckoutComponent,
    LoadingComponent,
    TransportComponent,
    TransInComponent,
    StockComponent,
  ],
  imports: [
    // Ng Module
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // Ng-Zorro Module
    NzButtonModule,
    NzMessageModule,
    NzDropDownModule,
    NzGridModule,
    NzCheckboxModule,
    NzToolTipModule,
    NzPopoverModule,
    NzSelectModule,
    NzIconModule,
    NzBadgeModule,
    NzAlertModule,
    NzModalModule,
    NzTableModule,
    NzDrawerModule,
    NzTabsModule,
    NzInputModule,
    NzIconModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzTagModule,
    NzInputNumberModule,
    NzBreadCrumbModule,
    NzListModule,
    NzSwitchModule,
    NzRadioModule,
    NzFormModule,
    NzAvatarModule,
    NzSpinModule,
    NzCardModule,
    NzDividerModule,
    NzProgressModule,
    NzPopconfirmModule,
    NzUploadModule,
    NzLayoutModule,
    NzResultModule,
    NzSkeletonModule,
    NzTypographyModule,
    NzCarouselModule,
    NzSpaceModule,
    NzDatePickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
