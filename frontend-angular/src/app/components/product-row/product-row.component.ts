import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { ShoppingProduct } from "../../models/shopping-product.model";
@Component({
    selector: 'product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.scss']
  })
  export class ProductRowComponent {
    @Input() product: ShoppingProduct = new ShoppingProduct()
    @Input() imgStyle: any;
}