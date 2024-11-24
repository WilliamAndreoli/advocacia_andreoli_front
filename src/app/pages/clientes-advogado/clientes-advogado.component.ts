import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent
  ],
  templateUrl: './clientes-advogado.component.html',
  styleUrl: './clientes-advogado.component.scss'
})
export class ClientesAdvogadoComponent implements OnInit{
  clientes: Cliente[] = [];
  loading = false;
  error = '';
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private clienteService: ClienteService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {

   }

   ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.loading = true;
    this.clienteService.getAllClientesAtivos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.clientes = response.content;
        this.loading = false;
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

  mudarPagina(page: number) {
    this.currentPage = page;
    this.carregarClientes();
  }

  exibirDetalhesDoCliente(cpf: string) {
    this.router.navigate(['/clientes-advogado-details']);
    localStorage.removeItem("cpfClienteExibido")
    localStorage.setItem("cpfClienteExibido", cpf)
  }

}
