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
  
      if (toast.asyncFunction != null) {
        let response;
        try {
          // Defina um tempo limite para a resposta assíncrona
          const timeout = 5000; // 5 segundos
          const asyncPromise = toast.asyncFunction();
  
          // Aguarde a resposta ou lance um erro se estourar o tempo limite
          response = await Promise.race([asyncPromise, this.createTimeoutPromise(timeout)]);
        } catch (error) {
          console.error("Ocorreu um erro durante a execução da função assíncrona:", error);
          response = null; // Define a resposta como nula em caso de erro
        }
  
        if (response !== null) {
          toast.type = ToastType.SUCCESS;
          toast.message = "Feito com sucesso!";
        } else {
          toast.type = ToastType.ERROR;
          toast.message = "Ocorreu um erro";
        }
      }
  
      setTimeout(() => this.removeToast(toast), toast.duration);
    });
  }
  
  // Função para criar uma Promise de tempo limite
  private createTimeoutPromise(timeout: number): Promise<null> {
    return new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeout);
    });
  }
  
  removeToast(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}