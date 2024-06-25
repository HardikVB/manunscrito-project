import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../service/jwt';
import { Product } from '../../models/product.model';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.scss']
})
export class SinglePageProduct {
    token: string | null = null;
    isAdmin: boolean = false;
    language: string = "pt";
    product: Product | null = null;
    modalProductShow: boolean = false;
    modalRemoveProductShow: Boolean = false;
    selectedImage: string | undefined;

    constructor(
        private httpClient: HttpClient,
        private jwtService: JwtService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private shoppingService: ShoppingService
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

        this.activatedRoute.params.subscribe(async params => {
            this.product = await this.getProduct(params['id']) ?? new Product();
        });
    }


    async getProduct(productId: string) {
        let response: Product | undefined;

        try {

        response = await this.httpClient.get<Product>(`${environment.apiUrl}/${this.language}/store/product/${productId}`).toPromise();

        } catch (error) {

            this.toastService.showErrorToast("Erro ao obter produtos");
        }
        return response;
    }

    async saveProduct(product: Product) {
      if (!product.id) {
        this.toastService.showLoadingToast(
          "Produto a ser adicionado",
          "Produto adicionado com sucesso",
          () => this.httpClient.post(`${environment.apiUrl}/${this.language}/store/add`, product).toPromise(),
        );
      } else {
        this.toastService.showLoadingToast(
          "Produto a ser alterado",
          "Produto alterado com sucesso",
          () => this.httpClient.put(`${environment.apiUrl}/${this.language}/store/edit/${product.id}`, product).toPromise(),
        );
      }
  
      this.modalProductShow = false;
    }

    editProduct() {
      this.modalProductShow = true;
    }

    removeProductShowModal() {
      this.modalRemoveProductShow = true;
    }

    async removeProduct() {
      this.toastService.showLoadingToast(
        "Produto a ser removido",
        "Produto removido com sucesso",
        () => this.httpClient.delete(`${environment.apiUrl}/${this.language}/store/${this.product!.id}`).toPromise().then(() => this.router.navigate([`${this.language}/store`])),
      );
  
      this.modalRemoveProductShow = false;
    }

    addToCart() {
      this.toastService.showSuccessToast("Produto adicionado ao carrinho");

      this.shoppingService.addProduct(this.product!);
    }

    checkProductInShoppingCart() {
      return this.shoppingService.getProductById(this.product!.id) != null
    }
}
