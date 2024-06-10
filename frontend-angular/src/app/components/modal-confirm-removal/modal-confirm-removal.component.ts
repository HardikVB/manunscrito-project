import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal-confirm-removal',
  template: `
    <div class="modal is-active">
      <div class="modal-background" (click)="close()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar Remoção</h5>
        </div>
        <div class="modal-body">
          Tem certeza de que deseja remover este produto?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="close()">Cancelar</button>
          <button type="button" class="btn btn-danger" (click)="confirm()">Remover</button>
        </div>
      </div>
    </div>`,
  styleUrls: ['./modal-confirm-removal.component.scss']
})
export class ConfirmRemoveModalComponent {
  @Output() confirmRemove = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  confirm() {
    this.confirmRemove.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
