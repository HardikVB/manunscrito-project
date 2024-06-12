import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { ToastType } from '../../models/toast.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout-page',
  template: ''
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.authService.clearToken()

    this.toastService.showSuccessToast("Desconectado com sucesso!")

    // Redirecionar para a página inicial
    this.router.navigate(['/'])
  }

}
