import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragableContainerComponent } from './components/dragable-container/draggable-container.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CustomButtonComponent } from './components/button/custom-button.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthInterceptor } from './service/auth-interceptor';
import { ShoppingService } from './service/shopping.service';
import { ConfirmRemoveModalComponent } from './components/modal-confirm-removal/modal-confirm-removal.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from './service/auth.service';
import { NotFoundPage } from './pages/not-found-page/note-found-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductItemComponent,
    AdminItemComponent,
    ModalProductComponent,
    CarouselComponent,
    ShoppingCart,
    DragableContainerComponent,
    DropdownComponent,
    PaginationComponent,
    CustomButtonComponent,
    ToggleButtonComponent,
    ToastComponent,
    ConfirmRemoveModalComponent,
    ProductRowComponent,
    HomePage,
    StorePage,
    LogoutPage,
    LoginPage,
    NotFoundPage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ToastService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,},
    ShoppingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
