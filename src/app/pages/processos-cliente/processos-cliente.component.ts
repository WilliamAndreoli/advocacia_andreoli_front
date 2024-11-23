import { Component, OnInit } from '@angular/core';
import { Processo } from '../../interfaces/processo';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProcessoService } from '../../services/processo.service';

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

  constructor(
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {

   }

   ngOnInit() {
    this.carregarProcessos();
  }

   carregarProcessos() {
    this.loading = true;
    this.processoService.getAllProcessos().subscribe({
      next: (response) => {
        this.processos = response;
        console.log(this.processos)
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processos:', error);
        this.loading = false;
      }
    });
  }

}
