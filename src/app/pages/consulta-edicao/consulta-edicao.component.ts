import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-consulta-edicao',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './consulta-edicao.component.html',
  styleUrl: './consulta-edicao.component.scss'
})
export class ConsultaEdicaoComponent implements OnInit{
  consultaForm: FormGroup;
  idConsulta: any;

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private loginService: LoginService
  ) {
    this.consultaForm = new FormGroup({
      pagamento: new FormControl(''),
      data_pagamento: new FormControl(''),
      meio_pagamento: new FormControl(''),
    })
  }

  ngOnInit(): void {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }

    this.idConsulta = localStorage.getItem("idConsultaExibida");
    this.carregarDadosConsulta();
  }

  carregarDadosConsulta() {
    this.consultaService.getConsultaPorId(this.idConsulta).subscribe({
      next: (consulta) => {
        console.log(consulta)
        //this.consultaForm.patchValue(consulta);

        const consultaFormatada = {
          data_pagamento: consulta.dataPagamento,
          meio_pagamento: consulta.meioPagamento
        }
        this.consultaForm.patchValue(consultaFormatada);
        this.consultaForm.patchValue(consulta);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados da consulta', erro);
      }
    });
  }

  concluirPagamento() {
    const formValues = this.consultaForm.value;
    const dataPagamentoInput = new Date(formValues.data_pagamento);
    const dataFormatada = this.formatarDataParaBackend(dataPagamentoInput);

    const consulta = {
      data_pagamento: dataFormatada,
      meio_pagamento: formValues.meio_pagamento,
      pagamento: formValues.pagamento
    };

    console.log(consulta)
    
    this.consultaService.concluirPagamentoConsulta(this.idConsulta, consulta).subscribe({
      next: (response) => {
        this.toast.success("Pagamento efetuado com sucesso!");
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/consulta-details']);
          });
        }, 2000); // 2 segundos de delay
      },
      error: (error) => {
        this.toast.error("Erro ao realizar pagamento!")
      }
    })
  }

  formatarDataParaBackend(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
  }

}
