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
  @Output() clickProduct: EventEmitter<EventEmitterItem> = new EventEmitter<EventEmitterItem>();

  clickedOnProduct(event: Event) {
    // Exemplo de como você pode alterar isLoading para true durante o carregamento e para false após o carregamento
    this.product.loading = true;
    // Suponha que aqui você esteja fazendo alguma operação assíncrona, como carregar mais dados
    setTimeout(() => {
      this.clickProduct.emit({item: this.product, event: event});
      this.product.loading = false;
    }, 2000); // Supondo que a operação leve 2 segundos
  }
}
