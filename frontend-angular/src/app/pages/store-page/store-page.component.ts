import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../service/jwt';
import { ShoppingProduct } from '../../models/shopping-product.model';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePage {
  token: string | null = null;
  isAdmin: boolean = false;
  modalRemoveProductShow = false;
  modalProductShow = false;
  modalProductTitle: string = "";
  selectedProduct: ShoppingProduct = new ShoppingProduct();

  constructor(private httpClient: HttpClient, private jwtService: JwtService, private toastService: ToastService, private router: Router, private shoppingService: ShoppingService) {

    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);
      this.isAdmin = decodedToken.privilege == "admin";
    }
  }

  // Método para adicionar um produto
  addProductShoppingCart(product: ShoppingProduct): void {
    this.shoppingService.addProduct(product);

    this.toastService.showSuccessToast("Adicionado produto ao carrinho")
  }

  // Método para abrir o modal de Editar/Adicionar
  productModal(shoppingProduct: ShoppingProduct): void {
    shoppingProduct.id == null ? this.modalProductTitle = "Adicionar Produto" : this.modalProductTitle = "Editar Produto"

    this.selectedProduct = shoppingProduct;

    this.modalProductShow = true;
  }

  // Métodod para abrir o modal de remoção
  productRemoveModal(shoppingProduct: ShoppingProduct): void {
    this.selectedProduct = shoppingProduct;

    this.modalRemoveProductShow = true;
  }

  async saveProduct(product: ShoppingProduct) {
    if (!product.id) {
      this.toastService.showLoadingToast("Produto a ser alterado", () => this.httpClient.post(`${environment.apiUrl}/store/add`, product).toPromise().then(() => this.refreshStore()), "Produto adicionado com sucesso");

    } else {

      this.toastService.showLoadingToast("Produto a ser adicionado", () => this.httpClient.put(`${environment.apiUrl}/store/edit/${product.id}`, product).toPromise().then(() => this.refreshStore()), "Produto alterado com sucesso");
    }


    this.modalProductShow = false;
  }

  async removeProduct() {
    let product = this.selectedProduct;

    this.toastService.showLoadingToast("Produto a ser removido", () => this.httpClient.delete(`${environment.apiUrl}/store/${product.id}`).toPromise().then(() => this.refreshStore()), "Produto removido com sucesso");

    this.modalRemoveProductShow = false;
  }

  refreshStore() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['/store']);
    });
  
  }
}
