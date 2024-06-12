import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastModel, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastModel>();

  constructor() { }

  getToasts() {
    return this.toastSubject.asObservable();
  }

  // Método para mostrar um toast de carregamento
  showLoadingToast(message: string, endingMessage: string, asyncFunction: () => Promise<any>, duration: number = 3000, title?: string): void {
    const toast: ToastModel = {
      message,
      title,
      duration,
      type: ToastType.LOADING,
      endingMessage,
      asyncFunction // Passa a função assíncrona
    };

    this.toastSubject.next(toast);
  }

  // Método para mostrar um toast de sucesso
  showSuccessToast(message: string, duration: number = 3000, title?: string)  {
    this.toastSubject.next({ message, title, duration, type: ToastType.SUCCESS });
  }

  // Método para mostrar um toast de erro
  showErrorToast(message: string, duration: number = 3000000, title?: string)  {
    this.toastSubject.next({ message, title, duration, type: ToastType.ERROR });
  }
}