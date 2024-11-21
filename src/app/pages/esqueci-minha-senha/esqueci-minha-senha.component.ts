import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-esqueci-minha-senha',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrl: './esqueci-minha-senha.component.scss'
})
export class EsqueciMinhaSenhaComponent implements OnInit {
  formEmail: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formEmail = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formEmail.valid) {
      const email = this.formEmail.value.userName;

      this.http.post('http://localhost:8080/forgot-password', { email }).subscribe({
        next: (response) => {
          console.log('E-mail enviado com sucesso:', response);
          alert('E-mail enviado! Verifique sua caixa de entrada.');
        },
        error: (error) => {
          console.error('Erro ao enviar e-mail:', error);
          alert('Erro ao enviar e-mail. Tente novamente.');
        },
      });
    }
  }
}
