import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { ToastType } from '../../models/toast.model';
import { AuthService } from '../../service/auth.service';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'app-logout-page',
  template: ''
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService, private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    
    this.authService.clearToken()

    this.toastService.showSuccessToast("Desconectado com sucesso!")

    this.shoppingService.getProducts().forEach((p) => this.shoppingService.removeProduct(p.id));

    this.router.navigate(['/pt'])
  }

}
