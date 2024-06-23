// modal.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { Image } from '../../models/image.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'modal-user',
  template: `
    <div class="modal is-active">
        <div class="modal-background" (click)="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{title}}</h2>
            </div>
            <div class="modal-body">
                <form (ngSubmit)="saveUser()">
                    <div class="form-group">
                        <label for="title">Username:</label>
                        <input type="text" class="form-control" id="title" name="title" required [(ngModel)]="user.username">
                    </div>
                    <div class="form-group">
                        <label for="description">Telemovel:</label>
                        <input class="form-control" id="description" name="description_thumbnail" rows="2" required [(ngModel)]="user.phone">
                    </div>
                    <div class="form-group">
                        <label for="description">Email:</label>
                        <input class="form-control" id="description" name="description" rows="6" required [(ngModel)]="user.email">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button type="button" class="btn btn-success" (click)="saveUser()">Confirmar</button>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent {
    @Input() multiImages: Boolean = false;
    @Input() user!: User;
    @Input() title: string = "Utilizador";
    @Output() clickBackground: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() saveUserClick: EventEmitter<User> = new EventEmitter<User>()

    closeModal(): void {
        this.clickBackground.emit()
    }

    saveUser(): void {
        this.saveUserClick.emit(this.user)
    }
}