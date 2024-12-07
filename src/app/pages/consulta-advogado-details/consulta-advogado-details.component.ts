import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { ConsultaService } from '../../services/consulta.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataFormatPipe } from '../../pipes/data-format.pipe';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-consulta-advogado-details',
  standalone: true,
  imports: [
    AdvLayoutComponent,
    DataFormatPipe
  ],
  templateUrl: './consulta-advogado-details.component.html',
  styleUrl: './consulta-advogado-details.component.scss'
})
export class ConsultaAdvogadoDetailsComponent implements OnInit{
  idConsulta: any;
  loading = false;
  error = '';
  consulta: any;

  constructor(
    private consultaService: ConsultaService,
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

    this.carregaConsulta();
  }

  carregaConsulta() {
    this.loading = true;
    this.idConsulta = localStorage.getItem("idConsultaExibida");
    this.consultaService.getConsultaPorId(this.idConsulta).subscribe({
      next: (response) => {
        console.log(response)
        this.consulta = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  retornarPagina() {
    localStorage.removeItem("idConsultaExibida");
    this.router.navigate(['/consultas-advogado']);
  }

  editarConsulta() {
    this.router.navigate(['/consulta-edicao']);
  }

}
