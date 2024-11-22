import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../types/error-response.type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form-altera-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-altera-usuario.component.html',
  styleUrl: './form-altera-usuario.component.scss',
  providers: [
    UsuarioService
  ]
})
export class FormAlteraUsuarioComponent {
  email: any = sessionStorage.getItem("alteraUsuarioNome")

  formAlterar!: FormGroup;
  
  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastrService
  ) {
    this.formAlterar = new FormGroup({
      username: new FormControl('', Validators.email),
      name: new FormControl(),
      password: new FormControl(),
      tipoUsuario: new FormControl()
    })
  }

  alteraUsuario() {
    if (this.formAlterar.valid) {
      const formValues = this.formAlterar.value;

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

      this.usuarioService.updateUsuario(this.email, usuario).subscribe({
        next: (response) => {
          this.toastService.success('Usuário alterado com sucesso!');
          this.formAlterar.reset(); 
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
        }
      })
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
