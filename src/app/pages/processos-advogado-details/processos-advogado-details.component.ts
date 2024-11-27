import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';

@Component({
  selector: 'app-processos-advogado-details',
  standalone: true,
  imports: [
    AdvLayoutComponent
  ],
  templateUrl: './processos-advogado-details.component.html',
  styleUrl: './processos-advogado-details.component.scss'
})
export class ProcessosAdvogadoDetailsComponent implements OnInit{
  numeroProcesso: any;
  loading = false;
  error = '';
  processo: any;

  constructor(
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {

   }

   ngOnInit() {
    this.carregaProcesso();
  }

  carregaProcesso() {
    this.loading = true;
    this.numeroProcesso = localStorage.getItem("numeroProcessoExibido");
    this.processoService.getProcessoPorNumeroProcesso(this.numeroProcesso).subscribe({
      next: (response) => {
        console.log(response)
        this.processo = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  retornarPagina() {
    localStorage.removeItem("numeroProcessoExibido");
    this.router.navigate(['/processos-advogado']);
  }

  editarProcesso() {
    this.router.navigate(['/processos-edicao']);
  }
  

}
