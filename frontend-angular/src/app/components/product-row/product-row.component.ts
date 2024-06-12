import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Product } from "../../models/product.model";
@Component({
    selector: 'product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.scss']
  })
  export class ProductRowComponent {
    @Input() product: Product = new Product()
    @Input() imgStyle: any;
}