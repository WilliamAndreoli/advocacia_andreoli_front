import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoUsuario } from '../../interfaces/tipoUsuario';

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
export class CriarUsuarioComponent {
  usuarioForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService
  ) {
      this.usuarioForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        tipoUsuario: new FormControl('', Validators.required)
      })
  }
  
  onSubmit() {
    console.log('Método chamado');
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
        console.log('Usuário criado com sucesso:', response);
        alert('Usuário criado com sucesso!');
        this.usuarioForm.reset(); // Limpa o formulário
      },
      error: (err) => {
        console.error('Erro ao criar usuário:', err);
        alert('Erro ao criar usuário. Tente novamente.');
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