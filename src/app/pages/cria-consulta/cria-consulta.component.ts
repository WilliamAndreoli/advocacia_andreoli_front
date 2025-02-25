import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../services/cliente.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cria-consulta',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cria-consulta.component.html',
  styleUrl: './cria-consulta.component.scss'
})
export class CriaConsultaComponent implements OnInit{
  consultaForm!: FormGroup;

  cliente: any;

  constructor(
    private consultaService: ConsultaService,
    private clienteService: ClienteService,
    private toastService: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {
      this.consultaForm = new FormGroup({
        valor: new FormControl('', Validators.required),
        dataMarcada: new FormControl(Date, [Validators.required]),
        cliente: new FormControl('', [Validators.required, Validators.maxLength(11)])
      })
  }

  ngOnInit() {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }
  }

  createConsulta() {
    if (this.consultaForm.valid) {
      const formValues = this.consultaForm.value;
      const dataInput = new Date(formValues.dataMarcada);
      const dataFormatada = this.formatarDataParaBackend(dataInput);
  
      
      this.clienteService.getClientePorCpf(formValues.cliente).subscribe({
        next: (cliente) => {
          // Cliente encontrado, agora cria a consulta
          const consulta = {
            valor: formValues.valor,
            dataMarcada: dataFormatada,
            cliente: {
              cpf: cliente.cpf // Assume que o objeto cliente tem uma propriedade cpf
            }
          };
  
          // Cria a consulta
          this.consultaService.createConsulta(consulta).subscribe({
            next: (response) => {
              this.toastService.success('Consulta criada com sucesso!');
              console.log(response);
              this.consultaForm.reset(); // Limpa o formulário
            },
            error: (error) => {
              this.toastService.error("Erro ao criar a consulta!");
              console.error(error);
            }
          });
        },
        error: (error) => {
          this.toastService.error(`Erro ao encontrar cliente com o CPF: ${formValues.cliente}`);
          console.error(error);
        }
      });
    } else {
      this.toastService.warning('Por favor, preencha todos os campos corretamente.');
    }
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
