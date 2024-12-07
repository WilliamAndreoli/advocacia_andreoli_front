import { Component, OnInit } from '@angular/core';
import { Processo } from '../../interfaces/processo';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProcessoService } from '../../services/processo.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-processos-cliente',
  standalone: true,
  imports: [],
  templateUrl: './processos-cliente.component.html',
  styleUrl: './processos-cliente.component.scss'
})
export class ProcessosClienteComponent implements OnInit{
  processos: Processo[] = [];
  loading = false;
  error = '';
  userName: any = sessionStorage.getItem("userName");
  cliente: any;
  cpf: string = '';

  constructor(
    private clienteService: ClienteService,
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {

   }

  ngOnInit() {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }

    this.carregarCliente();
  }

  carregarCliente() {
    this.clienteService.getClientePorEmail(this.userName).subscribe({
      next: (response) => {
        this.cliente = response
        this.cpf = this.cliente.cpf
        this.carregarProcessos()
      },
      error: (error) => {
        console.log("Erro ao encontrar Cliente!", error);
      }
    });
  }

   carregarProcessos() {
    this.loading = true;

    this.processoService.getAllProcessosPorCliente(this.cpf).subscribe({
      next: (response) => {
        this.processos = response;
        //console.log(this.processos)
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processos:', error);
        this.loading = false;
      }
    });
  }

  

}
