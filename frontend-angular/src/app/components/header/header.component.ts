import { Component } from '@angular/core';
import { JwtService } from '../../service/jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token: string | null = null;
  isAdmin: boolean = false;
  shoppingCartOpened: boolean = false;

  constructor(private jwtService: JwtService) {
    this.token = localStorage.getItem('accessToken');

    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);
      this.isAdmin = decodedToken.privilege == "admin";
    }
  }

  openShoppingCart() {
    this.shoppingCartOpened = !this.shoppingCartOpened;
  }
}