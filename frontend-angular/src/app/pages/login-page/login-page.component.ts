import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { ToastType } from '../../models/toast.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'login-home',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPage {

    constructor(private http: HttpClient, private toastService: ToastService, private router: Router) { }
  
    login(form: NgForm): void {
      const email = form.value.email;
      const password = form.value.password;
  
      // Enviar solicitação POST para o servidor
      this.http.post<any>(`${environment.apiUrl}/login`, { email, password }).subscribe(
        response => {
          // Se o login for bem-sucedido, armazene o token de acesso
          const accessToken = response.accessToken;
  
          // Salvar o token de acesso no localStorage ou sessionStorage
          localStorage.setItem('accessToken', accessToken);
  
          // Exibir mensagem de sucesso
          this.toastService.showSuccessToast("Login bem sucedido")

          // Redirecionar para a página inicial
          this.router.navigate(['/']);
        },
        error => {
          // Se o login falhar, exibir mensagem de erro
          this.toastService.showErrorToast("Erro ao fazer login!")
        }
      );
    }
  
  }