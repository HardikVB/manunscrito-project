import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventEmitterItem } from '../../models/event-emitter-product';
import { ShoppingProduct } from '../../models/shopping-product.model';
import { ButtonType, Types } from '../../models/toggle-button.model';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    @Input() pageSize: number = 10;
    @Input() currentPage: number = 1;
    @Input() sizes: number[] = [5, 10, 20, 50];
    @Output() clickProduct: EventEmitter<EventEmitterItem> = new EventEmitter<EventEmitterItem>()
    
    isGridView: boolean = true;
    products: ShoppingProduct[] = [];
    totalProducts: number = this.pageSize;

    constructor(private httpClient: HttpClient, private toastService: ToastService)  {
        this.toastService.showLoadingToast("A buscar produtos", () => this.getProducts() )
    }

    togglerOptions: ButtonType[] = [{icon: "fa-solid fa-th", type: Types.GRID}, {icon: "fa-solid fa-list", type: Types.LIST}]

    clickedOnProduct(product: ShoppingProduct, event: Event) {
        this.clickProduct.emit({item: product, event: event});
    }

    onOptionSelected(option: any) {
        this.pageSize = option;
        this.toastService.showLoadingToast("A buscar produtos", () => this.getProducts() )      
    }

    async getProducts(): Promise<any> {
        try {
          const response = await this.httpClient.get<any>(`${environment.apiUrl}/store/products?page=${this.currentPage}&pageSize=${this.pageSize}`).toPromise();
          this.products = response.products;
          this.totalProducts = response.count;

          return response;

        } catch (error) {

          throw error;
        }
    }

    // Método para alternar entre visualização de grid e lista
    toggleView(event: any): void {
        this.isGridView = !this.isGridView;
    }

    // Método para navegar para a próxima página
    nextPage(): void {
        if (this.currentPage * this.pageSize < this.totalProducts) {
            this.currentPage++;
            this.toastService.showLoadingToast("A buscar produtos", () => this.getProducts() )
        }
    }

    // Método para navegar para a página anterior
    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.toastService.showLoadingToast("A buscar produtos", () => this.getProducts() )
        }
    }

    calculateNumberPages() {
        return Math.ceil(this.totalProducts / this.pageSize)
    }
}
