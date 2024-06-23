import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { JwtService } from '../../service/jwt';
import { Product } from '../../models/product.model';
import { ShoppingService } from '../../service/shopping.service';
import { AuthService } from '../../service/auth.service';
import { response } from 'express';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: string | null = null;
  isAdmin: boolean = false;
  shoppingCartOpened: boolean = false;
  products: Product[] = [];
  language: string = 'pt'; // Default language

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private shoppingService: ShoppingService,
    private toastService: ToastService,
    private route: Router,
    private httpClient: HttpClient
    
  ) {
    this.token = localStorage.getItem('accessToken');

    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);

      this.isAdmin = decodedToken.privilege == "admin";
    }
    
    authService.getTokenObservable().subscribe((token) => {
      this.token = null;

      this.isAdmin = false;

      if(!token) return

      this.token = token

      const decodedToken = this.jwtService.decodeToken(this.token);

      this.isAdmin = decodedToken.privilege == "admin";
    })

    this.products = shoppingService.getProducts();

  }

  public ngOnInit() {
    
    this.route.events.subscribe((data) => {

      if (data instanceof RoutesRecognized) {
        
        const obj = data.state.root.firstChild?.params as any;

        if(obj.language) this.language = obj.language 
      }
    });
 }

  openShoppingCart() {
    this.shoppingCartOpened = !this.shoppingCartOpened;
  }

  finishOrder() {

    if(!this.token) return this.route.navigate([`${this.language}/login`]);

    const decodedToken = this.jwtService.decodeToken(this.token!)

    const request = {
      userId: decodedToken.id,
      products: this.shoppingService.getProducts()
    }

    this.toastService.showLoadingToast("Finalizando a compra", "Compra finalizada", () => this.httpClient.post(`${environment.apiUrl}/${this.language}/shopping/finish`, request).toPromise().then((response) => {
      this.route.navigate([`${this.language}/success`])
    }))

    return null;
  }

  removeItem(product: Product) {
    this.shoppingService.removeProduct(product.id)
    this.products = this.shoppingService.getProducts();
  }
}
