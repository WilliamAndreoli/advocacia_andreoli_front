import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-edicao',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cliente-edicao.component.html',
  styleUrl: './cliente-edicao.component.scss'
})
export class ClienteEdicaoComponent implements OnInit{
  clienteForm: FormGroup;
  clienteCpf: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      endereco: new FormControl(''),
      nome_pai: new FormControl(''),
      nome_mae: new FormControl(''),
      ctps: new FormControl(''),
      cnh: new FormControl(''),
      data_nascimento: new FormControl(Date, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.clienteCpf = localStorage.getItem("cpfClienteExibido");
    this.carregarDadosCliente();
  }

  carregarDadosCliente() {
    this.clienteService.getClientePorCpf(this.clienteCpf).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue(cliente);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados do cliente', erro);
      }
    });
  }

  salvarCliente() {
    if (this.clienteForm.valid) {
      const dadosCliente = this.clienteForm.value;
      this.clienteService.atualizarCliente(this.clienteCpf, dadosCliente).subscribe({
        next: () => {
          //console.log(dadosCliente)
          this.router.navigate(['/clientes-advogado']);
        },
        error: (error) => {
          console.error('Erro ao salvar cliente', error);
        }
      });
    }
  }

  cancelarEdicao() {
    this.router.navigate(['/clientes-advogado']);
  }

}
