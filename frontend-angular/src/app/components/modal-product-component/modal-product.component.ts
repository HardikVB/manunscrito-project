// modal.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { Image } from '../../models/image.model';

@Component({
  selector: 'modal-edit-product',
  template: `
    <div class="modal is-active">
        <div class="modal-background" (click)="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{title}}</h2>
            </div>
            <div class="modal-body">
                <form (ngSubmit)="saveProduct()">
                    <div class="form-group">
                        <img *ngIf="product.image_thumbnail" [src]="product.image_thumbnail" class="preview-image">
                        <label for="title">Título:</label>
                        <input type="text" class="form-control" id="title" name="title" required [(ngModel)]="product.translation.title">
                    </div>
                    <div class="form-group">
                        <label for="description">Descrição Thumbnail:</label>
                        <textarea class="form-control" id="description" name="description_thumbnail" rows="2" required [(ngModel)]="product.translation.description_thumbnail"></textarea>
                    </div>
                    <div class="form-group" *ngIf="multiImages">
                        <label for="description">Descrição:</label>
                        <textarea class="form-control" id="description" name="description" rows="6" required [(ngModel)]="product.translation.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="price">Preço:</label>
                        <input type="number" class="form-control" id="price" name="price" required [(ngModel)]="product.price">
                    </div>
                    <div class="form-group">
                        <label for="image">Thumnail Image:</label>
                        <input type="file" class="form-control" id="image" name="image" (change)="onImageChange($event)">
                    </div>
                    <div class="form-group" *ngIf="multiImages">
                        <label for="image">Imagens:</label>
                        <input type="file" class="form-control" id="image" name="image" (change)="onImagesChange($event)">
                    </div>
                    <div class="row">
                        <div class="col-1" *ngFor="let image of product.images">
                            <img class="w-100" src="{{image.image_base64}}" alt="{{product.id}}" (click)="removeImage(image)"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button type="button" class="btn btn-success" (click)="saveProduct()">Confirmar</button>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent {
    @Input() multiImages: Boolean = false;
    @Input() product!: Product;
    @Input() title: string = "Adicionar Produto";
    @Output() clickBackground: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() saveProductClick: EventEmitter<Product> = new EventEmitter<Product>()

    closeModal(): void {
        this.clickBackground.emit()
    }

    saveProduct(): void {
        this.saveProductClick.emit(this.product)
    }

    onImageChange(event: any): void {

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            this.product.image_thumbnail = reader.result as string;
        };

        reader.readAsDataURL(file);
    }

    onImagesChange(event: any): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            this.product.images.push({image_base64: reader.result as string, productId: this.product.id, id: 0});
        };

        reader.readAsDataURL(file);
    }

    removeImage(image: Image) {
        this.product.images = this.product.images.filter((img) => img == image);
    }
}