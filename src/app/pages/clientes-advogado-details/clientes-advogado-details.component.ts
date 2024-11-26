import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClienteEdicaoComponent } from '../cliente-edicao/cliente-edicao.component';
import { DataFormatPipe } from '../../pipes/data-format.pipe';

@Component({
  selector: 'app-clientes-advogado-details',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    DataFormatPipe
  ],
  templateUrl: './clientes-advogado-details.component.html',
  styleUrl: './clientes-advogado-details.component.scss'
})
export class ClientesAdvogadoDetailsComponent implements OnInit{
  cpf: any;
  loading = false;
  error = '';
  cliente: any;

  constructor(
    private clienteService: ClienteService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.carregaCliente();
  }

  carregaCliente() {
    this.loading = true;
    this.cpf = localStorage.getItem("cpfClienteExibido");
    this.clienteService.getClientePorCpf(this.cpf).subscribe({
      next: (response) => {
        console.log(response)
        this.cliente = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  criarUsuarioCliente() {
    this.clienteService.createUsuarioCliente(this.cliente.nome).subscribe({
      next: (response) => {
        console.log(response)
        this.toastService.success("Usuário Criado com Sucesso!");
        // Aguarda um pouco para o usuário ver o toast
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/clientes-advogado-details']);
        });
      }, 2000); // 2 segundos de delay
      },
      error: (error) => {
        console.log("Erro ao criar Usuário para o Cliente:", error);
        this.toastService.error("Erro ao criar Usuário para o Cliente!");
      }
    })
  }

  editarCliente() {
   this.router.navigate(['/cliente-edicao']);
  }

  excluirCliente() {
    console.log("ExcluirCliente")
  }

}
