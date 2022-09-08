import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatenschutzComponent} from 'src/app/components/datenschutz/datenschutz.component';
import {CartComponent} from 'src/app/components/cart/cart.component';
import {HomeComponent} from 'src/app/components/home/home.component';
import {ImpressumComponent} from 'src/app/components/impressum/impressum.component';
import {LoginComponent} from 'src/app/components/login/login/login.component';
import {RegisterComponent} from 'src/app/components/login/register/register.component';
import {ProductsComponent} from 'src/app/components/products/products.component';
import {AccountComponent} from './components/account/account.component';
import {ResetPasswordComponent} from './components/login/reset-password/reset-password.component';
import {ChangePasswordComponent} from './components/login/change-password/change-password.component';
import {CheckoutconfirmComponent} from './components/checkout/checkoutconfirm/checkoutconfirm.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ErrorComponent} from './components/error/error.component';
import {ContactComponent} from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Bachelorarbeit Testshop'},
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {title: 'Products'},
  },
  {
    path: 'products/:searchTerm',
    component: ProductsComponent,
    data: {title: 'Products - Specific'},
  },
  {path: 'cart', component: CartComponent, data: {title: 'Cart'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {
    path: 'registration',
    component: RegisterComponent,
    data: {title: 'Registration'},
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent,
    data: {title: 'Datenschutz'},
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    data: {title: 'Impressum'},
  },
  {
    path: 'account',
    component: AccountComponent,
    data: {title: 'My Account'},
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    data: {title: 'Product'},
  },
  {
    path: 'resetPasswort',
    component: ResetPasswordComponent,
    data: {title: 'Reset Password'},
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    data: {title: 'Change Password'},
  },
  {
    path: 'checkout',
    component: CheckoutconfirmComponent,
    data: {title: 'Checkout'},
  },

  {
    path: 'error',
    component: ErrorComponent,
    data: {title: 'Error Page - 404'},
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {title: 'Contact'},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
