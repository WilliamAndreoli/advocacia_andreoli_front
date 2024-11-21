import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../default-layout/default-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginResponse } from '../../types/login-response.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    LoginService
  ]
})

export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.value.userName, 
        this.loginForm.value.password
      ).pipe(
        tap((response: LoginResponse) => {
          // First, show success toast
          //this.toastService.success("Login feito com sucesso!");
          
          // Then handle routing based on authorities
          const authorities = sessionStorage.getItem("authorities");
          
          const authToken = response.token

          const name = sessionStorage.getItem("userName")

          //console.log(name)

          //console.log(authToken)

          //console.log(authorities)

          if (authorities == 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (authorities == 'ROLE_ADVOGADO') {
            this.router.navigate(['/advogado']);
          } else if (authorities == 'ROLE_CLIENTE') {
            this.router.navigate(['/cliente']);
          } else {
            // If no matching role, show error and don't navigate
            this.toastService.error('Sem permissão de acesso');
          }
        }),
        catchError((error) => {
          this.toastService.error("Erro inesperado. Tente novamente mais tarde!");
          return of(null);
        })
      ).subscribe();
    } else {
      console.log('Formulário inválido');
    }
  }
}

