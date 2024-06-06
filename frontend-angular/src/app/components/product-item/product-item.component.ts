import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventEmitterItem } from '../../models/event-emitter-product';
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
  @Output() clickProduct: EventEmitter<EventEmitterItem> = new EventEmitter<EventEmitterItem>()

  clickedOnProduct(event: Event) {
    this.clickProduct.emit({item: this.product, event: event});
  }
}
