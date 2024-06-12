import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../service/jwt';
import { Product } from '../../models/product.model';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePage {
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  token: string | null = null;
  isAdmin: boolean = false;
  modalRemoveProductShow = false;
  modalProductShow = false;
  modalProductTitle: string = "";
  selectedProduct: Product = new Product();
  language: string = 'pt';
  totalProducts: number = 1;

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = localStorage.getItem('accessToken');

    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);
      this.isAdmin = decodedToken.privilege == "admin";
    }

    // Get the current language from the route
    this.activatedRoute.params.subscribe(params => {
      this.language = params['language'] || 'pt';
    });

    this.getProducts()
  }

  // Método para abrir o modal de Editar/Adicionar
  productModal(product: Product): void {
    product.id == null ? this.modalProductTitle = "Adicionar Produto" : this.modalProductTitle = "Editar Produto"

    this.selectedProduct.translation.description_thumbnail = product.translation.description_thumbnail;
    this.selectedProduct.translation.language = product.translation.language;
    this.selectedProduct.translation.title = product.translation.title;
    this.selectedProduct.price = product.price;
    this.selectedProduct.image_thumbnail = product.image_thumbnail;
    this.selectedProduct.id = product.id

    this.modalProductShow = true;
  }

  // Método para abrir o modal de remoção
  productRemoveModal(Product: Product): void {
    this.selectedProduct = Product;

    this.modalRemoveProductShow = true;
  }

  async saveProduct(product: Product) {
    console.log(product)
    if (!product.id) {
      this.toastService.showLoadingToast(
        "Produto a ser alterado",
        "Produto adicionado com sucesso",
        () => this.httpClient.post(`${environment.apiUrl}/${this.language}/store/add`, product).toPromise().then(() => this.refreshStore()),
      );
    } else {
      this.toastService.showLoadingToast(
        "Produto a ser adicionado",
        "Produto alterado com sucesso",
        () => this.httpClient.put(`${environment.apiUrl}/${this.language}/store/edit/${product.id}`, product).toPromise().then(() => this.refreshStore()),
      );
    }

    this.modalProductShow = false;
  }

  async removeProduct() {
    this.toastService.showLoadingToast(
      "Produto a ser removido",
      "Produto removido com sucesso",
      () => this.httpClient.delete(`${environment.apiUrl}/${this.language}/store/${this.selectedProduct.id}`).toPromise().then(() => this.refreshStore()),
    );

    this.modalRemoveProductShow = false;
  }

  onChangePageSize(option: number) {
    this.pageSize = option;

    this.refreshStore();
  }

  nextPage() {
    this.currentPage++;

    this.refreshStore()
  }

  previousPage() {
    this.currentPage--;

    this.refreshStore()
  }

  async refreshStore(): Promise<any> {
    return this.getProducts();
  }

  async getProducts(): Promise<any> {
        
      this.populateLoadingCards()

      let response: any;

      try {

        const response = await this.httpClient.get<any>(`${environment.apiUrl}/${this.language}/store/products?page=${this.currentPage}&pageSize=${this.isAdmin ? this.pageSize - 1 : this.pageSize}`).toPromise();

        this.products = response.products;

        this.totalProducts = response.count;

      } catch (error) {

          this.toastService.showErrorToast("Erro ao obter produtos!");
      }

      return response;
  }

  populateLoadingCards() {
      this.products = []

      for(let i = 0; i < this.pageSize; i++) {
          this.products.push(new Product())
      }
  }
}
