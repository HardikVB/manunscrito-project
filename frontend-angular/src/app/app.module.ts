import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { StorePage } from './pages/store-page/store-page.component';
import { ToastService } from './service/toast.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AdminItemComponent } from './components/admin-item/admin-item.component';
import { ModalProductComponent } from './components/modal-product-component/modal-product.component';
import { HomePage } from './pages/home-page/home-page.component';
import { LogoutPage } from './pages/logout-page/logout-page.page';
import { LoginPage } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ShoppingCart } from './components/shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductItemComponent,
    AdminItemComponent,
    ModalProductComponent,
    CarouselComponent,
    ShoppingCart,
    HomePage,
    StorePage,
    LogoutPage,
    LoginPage,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
