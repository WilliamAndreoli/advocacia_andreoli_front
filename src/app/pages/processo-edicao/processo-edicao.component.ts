import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcessoService } from '../../services/processo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-processo-edicao',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './processo-edicao.component.html',
  styleUrl: './processo-edicao.component.scss'
})
export class ProcessoEdicaoComponent implements OnInit{
  processoForm: FormGroup;
  numeroProcesso: any;

  constructor(
    private fb: FormBuilder,
    private processoService: ProcessoService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.processoForm = new FormGroup({
      numeroProcesso: new FormControl(''),
      juiz: new FormControl(''),
      area: new FormControl(''),
      comarca: new FormControl(''),
      status: new FormControl(''),
      valor_processo: new FormControl('')
    })
  }

  ngOnInit(): void {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }

    this.numeroProcesso = localStorage.getItem("numeroProcessoExibido");
    this.carregarDadosProcesso();
  }

  carregarDadosProcesso() {
    this.processoService.getProcessoPorNumeroProcesso(this.numeroProcesso).subscribe({
      next: (processo) => {
        this.processoForm.patchValue(processo);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados do processo', erro);
      }
    });
  }

  cancelarEdicao() {
    this.router.navigate(['/processos-advogado-details']);
  }

  salvarProcesso() {
    if (this.processoForm.valid) {
      const dadosProcesso = this.processoForm.value;
      this.processoService.atualizarProcesso(this.numeroProcesso, dadosProcesso).subscribe({
        next: () => {
          //console.log(dadosCliente)
          this.router.navigate(['/processos-advogado']);
        },
        error: (error) => {
          console.error('Erro ao salvar processo', error);
        }
      });
    }
  }

}
