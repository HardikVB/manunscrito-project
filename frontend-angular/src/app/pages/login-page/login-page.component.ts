import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';
import { response } from 'express';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'login-home',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPage {

  language: string = "pt";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    // Get the current language from the route
    this.activatedRoute.params.subscribe(params => {
      this.language = params['language'] || 'pt';
    });
  }
  
    login(form: NgForm): void {
      const email = form.value.email;
      const password = form.value.password;
  
      // Enviar solicitação POST para o servidor
      this.httpClient.post<any>(`${environment.apiUrl}/${this.language}/login`, { email, password }).subscribe(
        response => {
          // Se o login for bem-sucedido, armazene o token de acesso
          const accessToken = response.accessToken;
  
          // Salvar o token de acesso no localStorage ou sessionStorage
          localStorage.setItem('accessToken', accessToken);

          this.authService.setToken(accessToken);

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