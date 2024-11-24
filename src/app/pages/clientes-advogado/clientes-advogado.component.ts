import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    ReactiveFormsModule
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

  searchTerm: string = ''
  pesquisarForm!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.pesquisarForm = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
  })
   }

   ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.loading = true;
    this.clienteService.getAllClientesAtivos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.clientes = response.content;
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

  buscarCliente(): void {
    this.searchTerm = this.pesquisarForm.value.cpf
    if (!this.searchTerm.trim()) {
      console.log(this.searchTerm)
      this.carregarClientes(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    this.clienteService.getClientePorCpf(this.searchTerm).subscribe({
      next: (cliente) => {
        this.clientes = [cliente];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    })
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
