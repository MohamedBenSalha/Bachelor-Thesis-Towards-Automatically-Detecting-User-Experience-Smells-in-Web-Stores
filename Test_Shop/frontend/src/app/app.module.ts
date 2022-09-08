import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from 'src/app/components/home/home.component';
import {ProductsComponent} from 'src/app/components/products/products.component';
import {NavbarComponent} from 'src/app/components/navbar/navbar.component';
import {CartComponent} from 'src/app/components/cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipe} from 'src/app/shared/filter.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LoginComponent} from 'src/app/components/login/login/login.component';
import {RegisterComponent} from 'src/app/components/login/register/register.component';
import {RestorepasswordComponent} from 'src/app/components/login/restorepassword/restorepassword.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FooterComponent} from 'src/app/components/footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {DatenschutzComponent} from 'src/app/components/datenschutz/datenschutz.component';
import {ImpressumComponent} from 'src/app/components/impressum/impressum.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CheckoutconfirmComponent} from './components/checkout/checkoutconfirm/checkoutconfirm.component';
import {AddressseComponent} from './components/checkout/addressse/addressse.component';
import {PaymentComponent} from './components/checkout/payment/payment.component';
import {AccountComponent} from './components/account/account.component';
import {ResetPasswordComponent} from './components/login/reset-password/reset-password.component';
import {ChangePasswordComponent} from './components/login/change-password/change-password.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {NgxMatomoTrackerModule} from '@ngx-matomo/tracker';
import {NgxMatomoRouterModule} from '@ngx-matomo/router';
import {ErrorComponent} from './components/error/error.component';
import {ContactComponent} from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    CartComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    RestorepasswordComponent,
    FooterComponent,
    HomeComponent,
    DatenschutzComponent,
    ImpressumComponent,
    CheckoutconfirmComponent,
    AddressseComponent,
    PaymentComponent,
    AccountComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ProductDetailsComponent,
    ErrorComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    CarouselModule,
    MatSelectModule,
    NgxMatomoTrackerModule.forRoot({
      trackerUrl: '********************************', /*example: https://example.matomo.cloud/ */
      siteId: '********************************',/*example: 1 */
      scriptUrl: '********************************/matomo.php', /*example: https://example.matomo.cloud/matomo.php */
    }),
    NgxMatomoRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
