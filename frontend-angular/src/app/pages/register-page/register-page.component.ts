import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
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

export class RegisterPage implements OnInit {

  language: string = "pt";

  loginForm!: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    // Get the current language from the route
    this.activatedRoute.params.subscribe(params => {
      this.language = params['language'] || 'pt';
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator]], // Use o validador personalizado aqui
      repeat_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  
    register(): void {
      const email = this.loginForm.value.email;
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const repeatPassword = this.loginForm.value.repeat_password;
  
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

    passwordValidator = (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const password = control.value;
        // Regex para validar se a senha tem pelo menos 8 caracteres, uma letra minúscula e qualquer caractere especial
        const regex = /^(?=[^A-Z]*[A-Z])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d).{8,}$/;
        
        if (!regex.test(password)) {
          return { 'invalidPassword': true };
        }

       return null;
      };
    }

    passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
      const password = group.get('password')?.value;
      const repeatPassword = group.get('repeat_password')?.value;
      return password === repeatPassword ? null : { 'passwordMismatch': true };
    };
  }