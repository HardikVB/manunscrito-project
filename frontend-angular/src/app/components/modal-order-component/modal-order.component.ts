// modal.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { OrderResponse, StatusEnum } from '../../models/orders-response.model';

@Component({
  selector: 'modal-order',
  template: `
    <div class="modal is-active">
        <div class="modal-background" (click)="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{title}}</h2>
            </div>
            <div class="modal-body">
                <form (ngSubmit)="saveOrder()">
                    <div class="form-group">
                        <label for="title">Order number:</label>
                        <input type="text" class="form-control" id="title" name="title" required [(ngModel)]="order.id">
                    </div>
                    <div class="form-group">
                        <label for="status">Order Status:</label>
                        <select class="form-control" name="status" id="status" required [(ngModel)]="order.status">
                            <option *ngFor="let key of orderStatus" [value]="key">{{key}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="title">Username:</label>
                        <input type="text" class="form-control" id="title" name="title" required [(ngModel)]="order.user.username">
                    </div>
                    <div class="form-group">
                        <label for="description">Telemovel:</label>
                        <input class="form-control" id="description" name="description_thumbnail" rows="2" required [(ngModel)]="order.user.phone">
                    </div>
                    <div class="form-group">
                        <label for="description">Email:</label>
                        <input class="form-control" id="description" name="description" rows="6" required [(ngModel)]="order.user.email">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button type="button" class="btn btn-success" (click)="saveOrder()">Confirmar</button>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./modal-order.component.scss']
})
export class ModalUserComponent {
    @Input() multiImages: Boolean = false;
    @Input() order!: OrderResponse;
    @Input() title: string = "Pedido";
    @Output() clickBackground: EventEmitter<Event> = new EventEmitter<Event>()
    @Output() saveOrderClick: EventEmitter<OrderResponse> = new EventEmitter<OrderResponse>()

    orderStatus: string[] = []
    statusEnum = StatusEnum;

    constructor() {
        this.orderStatus = Object.keys(this.statusEnum);
    }

    closeModal(): void {
        this.clickBackground.emit()
    }

    saveOrder(): void {
        this.saveOrderClick.emit(this.order)
    }
}