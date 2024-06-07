import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { ToastModel, ToastType } from '../../models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: ToastModel[] = [];
  allRoleTypes = ToastType;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToasts().subscribe(async (toast: ToastModel) => {
      this.toasts.push(toast);

      if(toast.asyncFunction != null) {
        let response = await toast.asyncFunction()

        if(response) {
          toast.type = ToastType.SUCCESS;
          toast.message = "Feito com sucesso!"
        } else {
          toast.type = ToastType.ERROR;
          toast.message = "Ocorreu um erro"
        }
      }
      
      setTimeout(() => this.removeToast(toast), toast.duration); 
    });
  }

  removeToast(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}