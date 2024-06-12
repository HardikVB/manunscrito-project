import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { environment } from '../../../environments/environment';
import { response } from 'express';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'register-home',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPage {

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
  
    register(form: NgForm): void {
      const email = form.value.email;
      const username = form.value.username;
      const password = form.value.password;
      const repeatPassword = form.value.repeat_password;
  
      if(password != repeatPassword) {
        return this.toastService.showErrorToast("As passwords não coicidem");
      }

      this.toastService.showLoadingToast("A register utilizador", "Utilizador Registado", () => this.httpClient.post<any>(`${environment.apiUrl}/${this.language}/register`, { email, username, password }).toPromise().then((response) => {
        // Se o login for bem-sucedido, armazene o token de acesso
        const accessToken = response.accessToken;
  
        // Salvar o token de acesso no localStorage ou sessionStorage
        localStorage.setItem('accessToken', accessToken);

        this.authService.setToken(accessToken);

        // Exibir mensagem de sucesso
        this.toastService.showSuccessToast("Login bem sucedido")

        // Redirecionar para a página inicial
        this.router.navigate(['/']);
      }))
    }
  }