import { Component } from '@angular/core';
import { JwtService } from '../../service/jwt';
import { ShoppingProduct } from '../../models/shopping-product.model';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token: string | null = null;
  isAdmin: boolean = false;
  shoppingCartOpened: boolean = false;
  shoppingProducts: ShoppingProduct[] = []

  constructor(private jwtService: JwtService, private shoppingService: ShoppingService) {
    this.token = localStorage.getItem('accessToken');

    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);
      this.isAdmin = decodedToken.privilege == "admin";
    }

    this.shoppingProducts = shoppingService.getProducts();
  }

  openShoppingCart() {
    this.shoppingCartOpened = !this.shoppingCartOpened;
  }
}