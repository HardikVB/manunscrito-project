import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Product } from "../../models/product.model";
import { JwtService } from "../../service/jwt";

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

    constructor(private jwtService: JwtService, private elementRef: ElementRef) {
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
}