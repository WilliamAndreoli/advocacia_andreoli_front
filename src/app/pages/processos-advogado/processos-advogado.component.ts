import { Component } from '@angular/core';
import { Processo } from '../../interfaces/processo';
import { ProcessoService } from '../../services/processo.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdvogadoService } from '../../services/advogado.service';

@Component({
  selector: 'app-processos-advogado',
  standalone: true,
  imports: [],
  templateUrl: './processos-advogado.component.html',
  styleUrl: './processos-advogado.component.scss'
})
export class ProcessosAdvogadoComponent {
  processos: Processo[] = [];
  loading = false;
  error = '';
  userName: any = sessionStorage.getItem("userName");
  advogado: any;
  numeroOrdem: any;

  constructor(
    private advogadoService: AdvogadoService,
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {

   }

   ngOnInit() {
    this.carregarAdvogado();
  }

  carregarAdvogado() {
    this.advogadoService.getAdvogadoPorEmail(this.userName).subscribe({
      next: (response) => {
        this.advogado = response
        //console.log(response)
        this.numeroOrdem = this.advogado.numeroOrdem
        this.carregarProcessos()
      },
      error: (error) => {
        console.log("Erro ao encontrar Advogado!", error);
      }
    });
  }

   carregarProcessos() {
    this.loading = true;

    this.processoService.getAllProcessosPorAdvogado(this.numeroOrdem).subscribe({
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
