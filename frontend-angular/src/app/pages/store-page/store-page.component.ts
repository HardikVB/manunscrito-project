import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastType } from '../../models/toast.model';
import { JwtService } from '../../service/jwt';
import { ShoppingProduct } from '../../models/shopping-product.model';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePage implements OnInit {
  products: ShoppingProduct[] = [];
  adminProductAdd: ShoppingProduct = { title: "Adicionar Produto", loading: false };
  token: string | null = null;
  isAdmin: boolean = false;
  modalOpen = false;
  currentPage = 1; // Página atual
  pageSize = 18; // Tamanho da página
  totalProducts = 0; // Total de produtos

  constructor(private httpClient: HttpClient, private jwtService: JwtService, private toastService: ToastService) {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const decodedToken = this.jwtService.decodeToken(this.token);
      this.isAdmin = decodedToken.privilege == "admin";
    }
  }

  ngOnInit(): void {
  }

  // Método para adicionar um produto
  addProductModal(): void {
    this.modalOpen = true;
  }

  async saveProduct(product: ShoppingProduct) {
    try {
      let response: any;

      if (!product.id) {
        response = await this.httpClient.post(`${environment.apiUrl}/store/add`, product).toPromise();
      } else {
        response = await this.httpClient.put(`${environment.apiUrl}/store/edit/${product.id}`, product).toPromise();
      }

      this.modalOpen = false;

      if (response) { // Verificar se a resposta é OK e contém dados
        const updatedProduct: ShoppingProduct = response;

        // Verificar se o produto já existe na lista local
        const existingIndex = this.products.findIndex(p => p.id === updatedProduct.id);
        
        if (existingIndex !== -1) {
          // Se existir, substitua o produto na lista local
          this.products[existingIndex] = updatedProduct;
          this.toastService.showSuccessToast("Produto alterado com sucesso");
        } else {
          // Caso contrário, adicione o novo produto à lista
          this.products.push(updatedProduct);
          this.toastService.showSuccessToast("Produto adicionado com sucesso");
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      this.toastService.showErrorToast("Ocorreu um erro ao fazer a ação");
    }
  }
}
