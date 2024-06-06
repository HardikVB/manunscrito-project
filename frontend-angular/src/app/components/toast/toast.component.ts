import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { ToastModel } from '../../models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: ToastModel[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToasts().subscribe((toast: ToastModel) => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), toast.duration);
    });
  }

  removeToast(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}