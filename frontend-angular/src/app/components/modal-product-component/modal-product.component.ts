// modal.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingProduct } from '../../models/shopping-product.model';

@Component({
  selector: 'modal',
  template: `
    <div class="modal is-active">
        <div class="modal-background" (click)="closeModal()"></div>
        <div class="modal-content">
            <h2>Adicionar Produto</h2>
            <form (ngSubmit)="saveProduct()">
                <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" class="form-control" id="title" name="title" required [(ngModel)]="product.title">
                </div>
                <div class="form-group">
                <label for="description">Descrição:</label>
                <textarea class="form-control" id="description" name="description" rows="3" required [(ngModel)]="product.description"></textarea>
                </div>
                <div class="form-group">
                <label for="price">Preço:</label>
                <input type="number" class="form-control" id="price" name="price" required [(ngModel)]="product.price">
                </div>
                <div class="form-group">
                <label for="image">Imagem:</label>
                <input type="file" class="form-control" id="image" name="image" (change)="onImageChange($event)">
                <img *ngIf="product.image" [src]="product.image" class="preview-image">
                </div>
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
            </form>
            </div>
        <button class="modal-close is-large" aria-label="close" (click)="closeModal()"></button>
    </div>
  `,
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {
    
    @Input() product: ShoppingProduct = new ShoppingProduct();
    @Output() clickBackground: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() saveProductClick: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>()

  constructor() { }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.clickBackground.emit()
    }

    saveProduct(): void {
        // Implemente a lógica para salvar o produto, por exemplo, enviar para o servidor
        console.log('Product:', this.product);
        // Feche o modal
        this.saveProductClick.emit(this.product)
    }

    onImageChange(event: any): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
        this.product.image = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
  
}