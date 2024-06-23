import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { response, Router } from 'express';
import { OrderResponse } from '../../models/orders-response.model';
import { Translation } from '../../models/translating.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPage {
  selectedOrders = true;
  language: string = "pt"
  data: any
  currentPage = 0;
  pageSize = 12;
  modalProductShow: boolean = false;
  selectedProduct: Product = new Product()
  modalUserShow: boolean = false;
  user: User = new User()

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    // Get the current language from the route
    this.activatedRoute.params.subscribe(params => {
      this.language = params['language'] || 'pt';
    });

    this.getItems()
  }

  async getItems() {
    const response = await this.httpClient.get<OrderResponse[]>(`${environment.apiUrl}/${this.language}/dashboard/orders?page=${this.currentPage}&pageSize=${this.pageSize}`).toPromise()
    
    if(!response) return

    this.data = response.map((obj) => ({
      users: obj.users,
      id: obj.id,
      products: obj.products.map((product: Product) => {
        product.translation = product.translations.find((t: Translation) => t.language == this.language)!
        return product;
      }),
    }))
  }

  async checkUserInfo(order: OrderResponse) {
    this.modalUserShow = true;
    this.user = order.users[0]
  }

  async checkProductInfo(product: Product) {
    this.modalProductShow = true
    this.selectedProduct = product;
  }
}