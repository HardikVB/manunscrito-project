import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Product } from "../../models/product.model";
import { JwtService } from "../../service/jwt";
import { ShoppingService } from "../../service/shopping.service";

@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
  })
  export class ShoppingCart {
    @Input() products: Product[] = []
    @Input() shoppingCartOpened: boolean = false;
    @Output() clickedOutsideShoppingCart: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() clickedFinishOrder: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() clickedRemoveItem: EventEmitter<Product> = new EventEmitter<Product>()

    constructor(private jwtService: JwtService, private elementRef: ElementRef, private shoppingService: ShoppingService) {
    }

    // Fecha o carrinho de compras quando um clique fora dele é detectado
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if(!this.shoppingCartOpened) return;

        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.shoppingCartOpened = false;

            this.clickedOutsideShoppingCart.emit(event)
        }
    }

    finishOrder() {
        this.clickedFinishOrder.emit();
    }

    removeShoppingItem(product: Product) {
        this.clickedRemoveItem.emit(product);
    }
}