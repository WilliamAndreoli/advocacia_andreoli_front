import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../default-layout/default-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';

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
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulário enviado:', this.loginForm.value);
      this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe({
        next: () => this.toastService.success("Login feito com sucesso!"),
        error: () => this.toastService.error("Erro inesperado tente novamente mais tarde!")
      })
    } else {
      console.log('Formulário inválido');
    }
  }
}
