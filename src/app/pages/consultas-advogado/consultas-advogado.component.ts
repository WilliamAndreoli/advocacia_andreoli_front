import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { ConsultaService } from '../../services/consulta.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../../interfaces/consulta';
import { DataFormatPipe } from "../../pipes/data-format.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultas-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    DataFormatPipe
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

  constructor(
    private consultaService: ConsultaService,
    private http: HttpClient,
    private toastService: ToastrService
  ) {
    
  }

  ngOnInit() {
    this.carregarConsultas()
  }

  carregarConsultas() {
    this.loading = true;
    this.consultaService.getAllConsultasPageable(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log(response)
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
    this.carregarConsultas();
  }

}
