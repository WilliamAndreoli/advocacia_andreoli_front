import { Component } from '@angular/core';
import { Processo } from '../../interfaces/processo';
import { ProcessoService } from '../../services/processo.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdvogadoService } from '../../services/advogado.service';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

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

  currentPage = 0;
  pageSize = 6;
  totalPages = 0;
  totalElements = 0;

  searchStatus = '';
  pesquisarStatusForm!: FormGroup;

  constructor(
    private advogadoService: AdvogadoService,
    private processoService: ProcessoService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.pesquisarStatusForm = new FormGroup({
      status: new FormControl('', [Validators.required])
    })
   }

   ngOnInit() {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }

    this.carregarAdvogado();
    this.pesquisarForm = new FormGroup({
      tipoPesquisa: new FormControl('', [Validators.required]),
      searchTerm: new FormControl('', Validators.required)
    })
  }

  getPlaceholderTexto(): string {
    const tipoPesquisa = this.pesquisarForm.get('tipoPesquisa')?.value;
    switch(tipoPesquisa) {
      case 'numeroProcesso': return 'Pesquisar número...';
      case 'cpf': return 'Pesquisar CPF...';
      case 'comarca': return 'Pesquisar comarca...';
      default: return 'Pesquisar...';
    }
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

    this.processoService.getAllProcessosPorAdvogado(this.numeroOrdem, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.processos = response.content;
        //console.log(this.processos)
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processos:', error);
        this.loading = false;
      }
    });
  }

  buscarProcesso(): void {
    const tipoPesquisa = this.pesquisarForm.get('tipoPesquisa')?.value;
    this.searchTerm = this.pesquisarForm.get('searchTerm')?.value;
    
    if (!this.searchTerm.trim()) {
      //console.log(this.searchTerm)
      this.carregarProcessos(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    switch(tipoPesquisa) {
      case 'numeroProcesso':
        this.processoService.getProcessoPorNumeroProcesso(this.searchTerm).subscribe({
          next: (processo) => {
            //console.log(processo)
            this.processos = [processo];
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao carregar processos:', error);
            this.loading = false;
            this.error = 'Processo não encontrado';
          }
        });
        break;

      case 'cpf':
        this.processoService.getAllProcessosPorCliente(this.searchTerm).subscribe({
          next: (processos) => {
            //console.log(processos)
            this.processos = processos;
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao carregar processos por CPF:', error);
            this.loading = false;
            this.error = 'Nenhum processo encontrado para este CPF';
          }
        });
        break;

      case 'comarca':
        // Adicione este método no seu serviço
        this.processoService.getAllProcessosPorComarca(this.searchTerm).subscribe({
          next: (processos) => {
            //console.log(processos)
            this.processos = processos.content;
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao carregar processos por comarca:', error);
            this.loading = false;
            this.error = 'Nenhum processo encontrado para esta comarca';
          }
        });
        break;
    }
  }

  buscarProcessoPorStatus(): void {
    this.searchStatus = this.pesquisarStatusForm.value.status
    if (!this.searchStatus.trim()) {
      //console.log(this.searchTerm)
      this.carregarProcessos(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    this.processoService.getAllProcessosPorStatus(this.searchStatus).subscribe({
      next: (processo) => {
        this.processos = processo.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processos:', error);
      }
    })
  }

  exibirDetalhesDoProcesso(numeroProcesso: string) {
    this.router.navigate(['/processos-advogado-details']);
    localStorage.removeItem("numeroProcessoExibido")
    localStorage.setItem("numeroProcessoExibido", numeroProcesso)
  }

  mudarPagina(page: number) {
    this.currentPage = page;
    this.carregarProcessos();
  }

}
