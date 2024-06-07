import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { ToastType } from '../../models/toast.model';

@Component({
  selector: 'app-logout-page',
  template: ''
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    // Remover o token de acesso do localStorage
    localStorage.removeItem('accessToken');

    this.toastService.showSuccessToast("Desconectado com sucesso!")

    // Redirecionar para a página inicial
    this.router.navigate(['/']);
  }

}
