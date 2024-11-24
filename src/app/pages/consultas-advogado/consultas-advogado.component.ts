import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { ConsultaService } from '../../services/consulta.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../../interfaces/consulta';

@Component({
  selector: 'app-consultas-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent
  ],
  templateUrl: './consultas-advogado.component.html',
  styleUrl: './consultas-advogado.component.scss'
})
export class ConsultasAdvogadoComponent implements OnInit{
  cpf: any;
  loading = false;
  error = '';
  consultas: Consulta[] = [];

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
    this.consultaService.getAllConsultas().subscribe({
      next: (response) => {
        console.log(response)
        this.consultas = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

}
