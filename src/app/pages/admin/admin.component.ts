import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { NotExpr } from '@angular/compiler';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvogadoService } from '../../services/advogado.service';
import { Advogado } from '../../interfaces/advogado';

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
  advogados: Advogado[] = [];
  loading = false;
  error = '';
  searchTerm: string = ''
  pesquisarForm!: FormGroup;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;


  constructor(
    private usuarioService: UsuarioService,
    private advogadoService: AdvogadoService,
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
    this.carregarAdvogados();
  }

  carregarUsuarios() {
    this.loading = true;
    this.usuarioService.getAllUsuariosAtivos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.usuarios = response.content;
        console.log(response)
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  carregarAdvogados() {
    this.loading = true;
    this.advogadoService.getAllAdvogados().subscribe({
      next: (response) => {
        this.advogados = response;
        console.log(response)
      },
      error: (error) => {
        console.error('Erro ao carregar advogados:', error);
        this.loading = false;
      }
    });
  }

  mudarPagina(page: number) {
    this.currentPage = page;
    this.carregarUsuarios();
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