import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { NotExpr } from '@angular/compiler';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  usuarios: Usuario[] = [];
  loading = false;
  error = '';
  searchTerm: string = ''
  pesquisarForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.pesquisarForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
  })
   }

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

  buscarUsuario(): void {
    this.searchTerm = this.pesquisarForm.value.username
    if (!this.searchTerm.trim()) {
      console.log(this.searchTerm)
      this.carregarUsuarios(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    this.usuarioService.getUsuarioByUsername(this.searchTerm).subscribe({
      next: (usuario) => {
        this.usuarios = [usuario];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    })
  }

  editarUsuario(usuario: Usuario) {
    sessionStorage.setItem("alteraUsuarioNome", usuario.username)

    this.router.navigate(['/form-altera-usuario']);
  }

  excluirUsuario(usuario: Usuario) {
    this.usuarioService.alteraStatus(usuario.username, usuario).subscribe({
      next: (response) => {
        this.toastService.success("Status de Usuário alterado para INATIVO")
        this.carregarUsuarios()
      }
    })
  }

}
