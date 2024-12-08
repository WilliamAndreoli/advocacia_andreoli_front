import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ErrorResponse } from '../../types/error-response.type';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent implements OnInit{
  usuarioForm!: FormGroup;

  userName: string | null = sessionStorage.getItem("userName")

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {
      this.usuarioForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
  }

  ngOnInit() {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }
  }

  alterarSenha() {
    if (this.usuarioForm.valid) {
      const formValues = this.usuarioForm.value;

      const senha = formValues.password
      const confirmaSenha = formValues.confirmPassword

      if (senha == confirmaSenha) {
        const tipoUsuario = {
          id: 0
        };
    
          // Constrói o objeto do usuário
        const usuario = {
          password: formValues.password,
          tipoUsuario: tipoUsuario,
        };
        
        this.usuarioService.alteraSenha(this.userName ,usuario).subscribe({
          next: (response) => {
            //console.log('Usuário criado com sucesso:', response);
            this.toastService.success('Senha alterada com sucesso!');
            this.usuarioForm.reset(); 
          },
          error: (error) => {
            let errorMessage = 'Erro ao alterar senha'
    
            if (error.error) {
              const errorResponse = error.error as ErrorResponse;
    
              switch(error.status) {
                case 401:
                  errorMessage = errorResponse.message || 'Dados inválidos';
                  break;
              }
            }
    
            this.toastService.error(errorMessage);
            return throwError(() => error);
          },
          });
          } else {
            alert('Por favor, preencha todos os campos corretamente.');
          }
        
      }
    }
  }
