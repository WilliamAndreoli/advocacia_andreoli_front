import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-advogado-details',
  standalone: true,
  imports: [
    AdvLayoutComponent
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
    private toastService: ToastrService
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

}
