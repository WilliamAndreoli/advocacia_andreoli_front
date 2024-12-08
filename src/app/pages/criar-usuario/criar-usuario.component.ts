import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoUsuario } from '../../interfaces/tipoUsuario';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../types/error-response.type';
import { throwError } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.scss',
  providers: [
    UsuarioService
  ]
})
export class CriarUsuarioComponent implements OnInit{
  usuarioForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {
      this.usuarioForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        tipoUsuario: new FormControl('', Validators.required)
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
  
  onSubmit() {
    //console.log('Método chamado');
    if (this.usuarioForm.valid) {
      const formValues = this.usuarioForm.value;

      // Constrói o objeto tipoUsuario esperado pelo back-end
      const tipoUsuario = {
        id: this.mapTipoUsuarioId(formValues.tipoUsuario), // Função para mapear IDs
        descricao: formValues.tipoUsuario,
      };

      // Constrói o objeto do usuário
    const usuario = {
      username: formValues.username,
      password: formValues.password,
      name: formValues.name,
      tipoUsuario: tipoUsuario,
    };

      // Chama o serviço para criar o usuário
    this.usuarioService.createUsuario(usuario).subscribe({
      next: (response) => {
        //console.log('Usuário criado com sucesso:', response);
        this.toastService.success('Usuário criado com sucesso!');
        this.usuarioForm.reset(); // Limpa o formulário
      },
      error: (error) => {
        let errorMessage = 'Erro ao realizar login'

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

// Mapeia o tipoUsuario (ADMIN, ADVOGADO, CLIENTE) para o ID correspondente
mapTipoUsuarioId(tipoUsuarioDescricao: string): number {
  switch (tipoUsuarioDescricao) {
    case 'ADMIN':
      return 1; // ID correspondente no banco
    case 'ADVOGADO':
      return 2;
    case 'CLIENTE':
      return 3;
    default:
      throw new Error(`Tipo de usuário inválido: ${tipoUsuarioDescricao}`);
  }
}
}