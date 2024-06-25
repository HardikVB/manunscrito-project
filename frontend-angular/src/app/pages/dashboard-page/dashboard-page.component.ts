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
  currentPage = 1;
  pageSize = 12;
  modalProductShow: boolean = false;
  modalOrderShow: boolean = false;
  selectedProduct: Product = new Product()
  totalCount: number = 0
  order: OrderResponse = new OrderResponse()

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
    const responseHttp = await this.httpClient.get<any>(`${environment.apiUrl}/${this.language}/dashboard/orders?page=${this.currentPage}&pageSize=${this.pageSize}`).toPromise()
    
    this.totalCount = responseHttp.count as number;
    const response = responseHttp.rows as OrderResponse[];

    if(!response) return

    this.data = response.map((obj) => ({
      status: obj.status,
      user: obj.users[0],
      id: obj.id,
      products: obj.products.map((product: Product) => {
        product.translation = product.translations.find((t: Translation) => t.language == this.language)!
        return product;
      }),
    }))
  }

  async checkOrderInfo(order: OrderResponse) {
    this.modalOrderShow = true;
    this.order = {...order}
  }

  async checkProductInfo(product: Product) {
    this.modalProductShow = true
    this.selectedProduct = {...product };
  }

  nextPage() {
    this.currentPage++;

    this.getItems()
  }

  previousPage() {
    this.currentPage--;

    this.getItems()
  }

  saveOrder(order: OrderResponse) {
    this.toastService.showLoadingToast("A guardar a order: " + order.id, "Foi salva a order: " + order.id, () => this.httpClient.put(`${environment.apiUrl}/${this.language}/dashboard/orders?id=${order.id}`, order).toPromise().then(() => {
      this.getItems()
    }))
  }

  pageSizeChanged(option: number) {
    this.pageSize = option;

    this.toastService.showLoadingToast("A obter encomendas", "As encomendas foram obtidas com sucesso", () => this.getItems());
  }
}