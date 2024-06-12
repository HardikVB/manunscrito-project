import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ButtonType, Types } from '../../models/toggle-button.model';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})


export class PaginationComponent {
    @Input() products: Product[] = [];
    @Input() isAdmin: boolean = false;
    @Input() pageSize: number = 12;
    @Input() currentPage: number = 1;
    @Input() sizes: number[] = [6, 12, 36, 72];
    @Input() totalProducts: number = 1;
    @Output() clickProduct: EventEmitter<Product> = new EventEmitter<Product>()
    @Output() clickEditProduct: EventEmitter<Product> = new EventEmitter<Product>()
    @Output() clickRemoveProduct: EventEmitter<Product> = new EventEmitter<Product>()
    @Output() clickAddProduct: EventEmitter<Product> = new EventEmitter<Product>()

    @Output() clickPreviousPage: EventEmitter<Event> = new EventEmitter();
    @Output() clickNextPage: EventEmitter<Event> = new EventEmitter();
    @Output() changePageSize: EventEmitter<number> = new EventEmitter();
        
    // Simple private settings for component
    isGridView: boolean = true;
    modalEditProductShow: boolean = false;
    modalRemovalConfirmationShow: boolean = false;
    newProduct: Product = new Product();

    constructor() {
        this.newProduct.loading = false;
    }

    // Toggler for list and grid
    togglerOptions: ButtonType[] = [{icon: "fa-solid fa-th", type: Types.GRID}, {icon: "fa-solid fa-list", type: Types.LIST}]

    clickedOnEditProduct(product: Product) {
        this.clickEditProduct.emit(product);
    }

    clickedOnRemoveProduct(product: Product) {
        this.clickRemoveProduct.emit(product);
    }

    clickedOnProduct(product: Product) {
        this.clickProduct.emit(product);
    }

    clickedOnAddProduct() {
        this.clickAddProduct.emit(this.newProduct);
    }

    onOptionSelected(option: any) {
        this.changePageSize.emit(option);
    }

    // Método para alternar entre visualização de grid e lista
    toggleView(event: any): void {
        this.isGridView = !this.isGridView;
    }

    // Método para navegar para a próxima página
    nextPage(): void {
        if (this.products.length < this.totalProducts) {
            this.clickNextPage.emit()
        }
    }

    // Método para navegar para a página anterior
    previousPage(): void {
        if (this.currentPage > 1) {
            this.clickPreviousPage.emit()
        }
    }

    calculateNumberPages() {
        return Math.ceil(this.totalProducts / this.pageSize)
    }
}
