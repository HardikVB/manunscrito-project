import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingProduct } from '../../models/shopping-product.model';

interface Product {
  title: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})


export class ProductItemComponent {
  @Input() product: ShoppingProduct = new ShoppingProduct();
  @Input() isAdmin: boolean = false;
  @Output() clickProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>();
  @Output() clickAddToCart: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>();
  @Output() clickEditProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>();
  @Output() clickRemoveProduct: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>();

  clickedOnProduct(event: Event) {
    event.stopPropagation();

    this.clickProduct.emit(this.product);
  }

  addToCart(event: Event) {
    event.stopPropagation();

    this.clickAddToCart.emit(this.product);
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
