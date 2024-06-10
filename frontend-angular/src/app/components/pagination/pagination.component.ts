import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingProduct } from '../../models/shopping-product.model';
import { ButtonType, Types } from '../../models/toggle-button.model';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ShoppingService } from '../../service/shopping.service';

interface Product {
  title: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})


export class PaginationComponent {
    @Input() products: ShoppingProduct[] = [];
    @Input() isAdmin: boolean = false;
    @Input() pageSize: number = 12;
    @Input() currentPage: number = 1;
    @Input() sizes: number[] = [6, 12, 36, 72];
    @Output() clickProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()
    @Output() clickEditProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()
    @Output() clickRemoveProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()
    @Output() clickAddProductToCart: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()
    @Output() clickAddProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()
        
    // Simple private settings for component
    isGridView: boolean = true;
    totalProducts: number = this.pageSize;
    modalEditProductShow: boolean = false;
    modalRemovalConfirmationShow: boolean = false;
    newProduct: ShoppingProduct = new ShoppingProduct();

    // Toggler for list and grid
    togglerOptions: ButtonType[] = [{icon: "fa-solid fa-th", type: Types.GRID}, {icon: "fa-solid fa-list", type: Types.LIST}]

    constructor(private httpClient: HttpClient, private toastService: ToastService, private shoppingService: ShoppingService)  {
        this.getProducts()
    }

    clickedOnEditProduct(product: ShoppingProduct) {
        this.clickEditProduct.emit(product);
    }

    clickedOnRemoveProduct(product: ShoppingProduct) {
        this.clickRemoveProduct.emit(product);
    }

    clickedOnProduct(product: ShoppingProduct) {
        this.clickProduct.emit(product);
    }

    clickedOnAddProduct() {
        this.clickAddProduct.emit(this.newProduct);
    }
    
    addToCart(shoppingItem: ShoppingProduct) {
        this.clickAddProductToCart.emit(shoppingItem);
    }

    onOptionSelected(option: any) {
        this.pageSize = option;

        this.toastService.showLoadingToast("A buscar produtos", () => this.getProducts() )      
    }

    // Método para alternar entre visualização de grid e lista
    toggleView(event: any): void {
        this.isGridView = !this.isGridView;
    }

    // Método para navegar para a próxima página
    nextPage(): void {
        if (this.products.length < this.totalProducts) {

            this.currentPage++;

            this.getProducts()
        }
    }

    // Método para navegar para a página anterior
    previousPage(): void {
        if (this.currentPage > 1) {

            this.currentPage--;

            this.getProducts()
        }
    }

    calculateNumberPages() {
        return Math.ceil(this.totalProducts / this.products.length)
    }

    async getProducts(): Promise<any> {
        
        this.populateLoadingCards()

        let response: any;

        try {

          const response = await this.httpClient.get<any>(`${environment.apiUrl}/store/products?page=${this.currentPage}&pageSize=${this.isAdmin ? this.pageSize - 1 : this.pageSize}`).toPromise();

          this.products = response.products;

          this.totalProducts = response.count;

        } catch (error) {

            this.toastService.showErrorToast("Erro ao obter produtos!");
        }

        this.newProduct.loading = false;

        return response;
    }

    populateLoadingCards() {
        this.products = []

        for(let i = 0; i < this.pageSize; i++) {
            this.newProduct.loading = true;

            this.products.push({loading: true})
        }
    }
}
