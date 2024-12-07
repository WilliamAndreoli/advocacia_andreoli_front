import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { ConsultaService } from '../../services/consulta.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../../interfaces/consulta';
import { DataFormatPipe } from "../../pipes/data-format.pipe";
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultas-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    DataFormatPipe,
    ReactiveFormsModule
],
  templateUrl: './consultas-advogado.component.html',
  styleUrl: './consultas-advogado.component.scss'
})
export class ConsultasAdvogadoComponent implements OnInit{
  cpf: any;
  loading = false;
  error = '';
  consultas: Consulta[] = [];

  currentPage = 0;
  pageSize = 4;
  totalPages = 0;
  totalElements = 0;

  searchTerm: string = ''
  pesquisarForm!: FormGroup;

  filtro = false;
  statusFiltro = '';

  constructor(
    private consultaService: ConsultaService,
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.pesquisarForm = new FormGroup({
      cliente: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.carregarConsultas()
  }

  carregarConsultas() {
    this.loading = true;
    this.consultaService.getAllConsultasPageable(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        //console.log(response)
        this.consultas = response.content;
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

    if (this.filtro == true) {
      this.buscarConsultaStatus(this.statusFiltro);  
    } else {
      this.carregarConsultas();
    }

   }

  buscarConsulta(): void {
    this.searchTerm = this.pesquisarForm.value.cliente
    if (!this.searchTerm.trim()) {
      //console.log(this.searchTerm)
      this.carregarConsultas(); // Recarrega todos os usuários se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.error = '';
    this.consultaService.getConsultasPorCliente(this.searchTerm).subscribe({
      next: (consultas) => {
        this.consultas = consultas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar Consultas:', error);
      }
    })
  }

  buscarConsultaStatus(status: string): void {
    if (status == '') {
      //console.log(this.searchTerm)
      this.carregarConsultas(); // Recarrega todos os usuários se a pesquisa estiver vazia
      this.filtro = false;
      return;
    }

    this.loading = true;
    this.error = '';
    this.statusFiltro = status;
    this.consultaService.getConsultaPorStatus(this.currentPage, this.pageSize, status).subscribe({
      next: (response) => {
        //console.log(response)
        this.consultas = response.content;
        this.consultas = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
        this.filtro = true;
      },
      error: (error) => {
        console.error('Erro ao carregar Consultas:', error);
      }
    })
  }

  exibirDetalhesConsulta(id: number) {
    let idString = id.toString()
    localStorage.setItem('idConsultaExibida', idString);
    this.router.navigate(['/consulta-details'])
  }

  concluirConsulta(id: number) {
    this.consultaService.concluirConsulta(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.success("Consulta concluida com sucesso!");
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/consultas-advogado']);
          });
        }, 2000);
      },
      error: (error) => {
        this.toastService.error("Erro ao alterar status da consulta!");
      }
    })
  }

}
