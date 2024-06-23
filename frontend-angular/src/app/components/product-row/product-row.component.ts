import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Product } from "../../models/product.model";
@Component({
    selector: 'product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.scss']
  })
  export class ProductRowComponent {
    @Input() isCart: boolean = false;
    @Input() product: Product = new Product()
    @Input() imgStyle: any;
    @Input() isAdmin: Boolean = false;

    @Output() clickEditProductEvent: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() clickRemoveProductEvent: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() clickProductEvent: EventEmitter<Product> = new EventEmitter<Product>();

    clickProduct(event: Event) {
      event.stopPropagation();

      this.clickProductEvent.emit(this.product);
    }

    editProduct(event: Event) {
      event.stopPropagation();

      this.clickEditProductEvent.emit(this.product)
    }

    removeProduct(event: Event) {
      event.stopPropagation();

      this.clickRemoveProductEvent.emit(this.product)
    }
}