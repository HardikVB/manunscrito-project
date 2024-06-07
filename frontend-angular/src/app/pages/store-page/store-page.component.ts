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
  adminProductAdd: ShoppingProduct = { title: "Adicionar Produto" };
  token: string | null = null;
  isAdmin: boolean = false;
  modalOpen = false;
  loading = true; // Variável de controle de carregamento
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
    // Recuperar os produtos da loja do backend
    this.fetchProducts();
  }

  // Método para buscar os produtos
  fetchProducts(): void {

    this.httpClient.get<any>(`${environment.apiUrl}/store/products?page=${this.currentPage}&pageSize=${this.currentPage == 1 ? this.pageSize - 1 : this.pageSize}`).subscribe(
      response => {
        this.products = response.products;
        this.totalProducts = response.count;
        this.loading = false; // Define loading como false após buscar os produtos
      },
      error => {
        console.error('Error fetching products:', error);
        this.loading = false; // Define loading como false em caso de erro
        // Exibir uma mensagem de erro ao usuário, se necessário
      }
    );
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

  calculateNumberPages() {
    return Math.ceil(this.totalProducts / this.pageSize)
  }

  // Método para navegar para a próxima página
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalProducts) {
      this.currentPage++;
      this.fetchProducts();
    }
  }

  // Método para navegar para a página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }
}
