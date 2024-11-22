import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminLayoutComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  usuarios: Usuario[] = [];
  loading = false;
  error = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  editarUsuario(usuario: Usuario) {
    console.log("editar usuario")
  }

  excluirUsuario(usuario: Usuario) {
    console.log("Excluir usuario")
  }

}
