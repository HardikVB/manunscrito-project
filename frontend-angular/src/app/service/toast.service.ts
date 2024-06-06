import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastModel, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastModel>();

  getToasts() {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, title?: string, duration?: number, type?: ToastType) {
    this.toastSubject.next({ message, duration, title, type});
  }
}