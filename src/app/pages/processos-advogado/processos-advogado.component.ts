import { Component } from '@angular/core';
import { Processo } from '../../interfaces/processo';
import { ProcessoService } from '../../services/processo.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdvogadoService } from '../../services/advogado.service';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-processos-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    ReactiveFormsModule
  ],
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

  searchTerm: string = ''
  pesquisarForm!: FormGroup;

  constructor(
    private advogadoService: AdvogadoService,
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.pesquisarForm = new FormGroup({
      numeroOrdem: new FormControl('', [Validators.required]),
    })
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

  buscarProcesso(): void {
    this.searchTerm = this.pesquisarForm.value.cpf
    if (!this.searchTerm.trim()) {
      //console.log(this.searchTerm)
      this.carregarProcessos(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    this.processoService.getProcessoPorNumeroProcesso(this.searchTerm).subscribe({
      next: (processo) => {
        this.processos = [processo];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processos:', error);
      }
    })
  }

}
