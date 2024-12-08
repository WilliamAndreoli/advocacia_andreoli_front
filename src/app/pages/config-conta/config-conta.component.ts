import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-config-conta',
  standalone: true,
  imports: [
    AdvLayoutComponent
  ],
  templateUrl: './config-conta.component.html',
  styleUrl: './config-conta.component.scss'
})
export class ConfigContaComponent implements OnInit{
  userName: string | null = sessionStorage.getItem("userName"); 

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit() {
    this.carregarUsuario()
  }

  carregarUsuario() {

    this.usuarioService.getUsuarioByUsername(this.userName).subscribe({
      next: (response) => {
        console.log("Usuário carregado com sucesso!")
      },
      error: (error) => {
        console.log("Erro ao carregar o Usuário")
      }
    })
  }

  retornarPagina() {
    localStorage.removeItem("idUsuarioExibido");
    this.router.navigate(['/advogado']);
  }

  alterarSenha() {
    this.router.navigate(["/alterar-senha"]);
  }

}
