import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ButtonType, Types } from '../../models/toggle-button.model';
import { OrderResponse } from '../../models/orders-response.model';

@Component({
  selector: 'dynamic-pagination',
  templateUrl: './dynamic-pagination.component.html',
  styleUrls: ['./dynamic-pagination.component.scss']
})


export class DynamicPaginationComponent {
    @Input() items: OrderResponse[] = [];
    headers: string[] = [];
    
    @Input() pageSize: number = 12;
    @Input() currentPage: number = 1;
    @Input() sizes: number[] = [6, 12, 36, 72];
    @Input() totalItems: number = 0;
    @Output() clickItem: EventEmitter<OrderResponse> = new EventEmitter<OrderResponse>()
    @Output() clickEditItem: EventEmitter<OrderResponse> = new EventEmitter<OrderResponse>()
    @Output() clickRemoveItem: EventEmitter<OrderResponse> = new EventEmitter<OrderResponse>()

    @Output() clickPreviousPage: EventEmitter<Event> = new EventEmitter();
    @Output() clickNextPage: EventEmitter<Event> = new EventEmitter();
    @Output() changePageSize: EventEmitter<number> = new EventEmitter();

    @Output() clickProduct: EventEmitter<Product> = new EventEmitter<Product>()
        
    // Simple private settings for component
    isGridView: boolean = true;
    modalEditProductShow: boolean = false;
    modalRemovalConfirmationShow: boolean = false;
    newitem: any = new Product();

    // Toggler for list and grid
    togglerOptions: ButtonType[] = [{icon: "fa-solid fa-th", type: Types.GRID}, {icon: "fa-solid fa-list", type: Types.LIST}]

    clickedOnEditProduct(item: OrderResponse) {
        this.clickEditItem.emit(item);
    }

    clickedOnRemoveProduct(item: OrderResponse) {
        this.clickRemoveItem.emit(item);
    }

    clickedOnItem(item: OrderResponse) {
        this.clickItem.emit(item);
    }

    clickedOnProduct(product: Product) {
        this.clickProduct.emit(product)
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
        if (this.items.length < this.totalItems) {
            this.clickNextPage.emit()
        }
    }

    // Método para navegar para a página anterior
    previousPage(): void {
        console.log(this.currentPage)
        if (this.currentPage > 1) {
            this.clickPreviousPage.emit()
        }
    }

    calculateNumberPages() {
        return Math.ceil(this.totalItems / this.pageSize)
    }
}
