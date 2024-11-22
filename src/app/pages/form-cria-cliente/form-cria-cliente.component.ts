import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-cria-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-cria-cliente.component.html',
  styleUrl: './form-cria-cliente.component.scss'
})
export class FormCriaClienteComponent {
  clienteForm!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private toastService: ToastrService
  ) {
      this.clienteForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        rg: new FormControl('', [Validators.required, Validators.maxLength(7)]),
        telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        endereco: new FormControl(''),
        nomePai: new FormControl(''),
        nomeMae: new FormControl(''),
        ctps: new FormControl(''),
        cnh: new FormControl(''),
        dataNascimento: new FormControl(Date, [Validators.required])
      })
  }

  createCliente() {
    console.log(this.clienteForm.value);
    if (this.clienteForm.valid) {
    
      const formValues = this.clienteForm.value;

      const cliente = {
        nome: formValues.nome,
        email: formValues.email,
        cpf: formValues.cpf,
        rg: formValues.rg,
        telefone: formValues.telefone,
        endereco: formValues.endereco,
        nomePai: formValues.nomePai,
        nomeMae: formValues.nomeMae,
        ctps: formValues.ctps,
        cnh: formValues.cnh,
        data_nascimento: formValues.dataNascimento
      };

    
      this.clienteService.createCliente(cliente).subscribe({
        next: (response) => {
          this.toastService.success('Cliente criado com sucesso!');
          console.log(cliente)
          this.clienteForm.reset(); // Limpa o formulário
        },
        error: (error) => {
          this.toastService.error("Erro ao criar o cliente!");
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

}
