import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})


export class ProductItemComponent {
  @Input() product: Product = new Product();
  @Input() isAdmin: boolean = false;
  @Output() clickProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() clickEditProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() clickRemoveProduct: EventEmitter<Product> = new EventEmitter<Product>();

  clickedOnProduct(event: Event) {
    event.stopPropagation();

    this.clickProduct.emit(this.product);
  }

  editProduct(event:Event) {
    event.stopPropagation();

    this.clickEditProduct.emit(this.product);
  }

  removeProduct(event:Event) {
    event.stopPropagation();

    this.clickRemoveProduct.emit(this.product);
  }
}
