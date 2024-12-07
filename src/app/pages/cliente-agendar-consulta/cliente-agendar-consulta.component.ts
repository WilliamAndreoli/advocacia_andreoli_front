import { Component, OnInit } from '@angular/core';
import { ClienteLayoutComponent } from '../../layout/cliente-layout/cliente-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../../interfaces/consulta';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-agendar-consulta',
  standalone: true,
  imports: [
    ClienteLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-agendar-consulta.component.html',
  styleUrl: './cliente-agendar-consulta.component.scss'
})
export class ClienteAgendarConsultaComponent implements OnInit{
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
        dataMarcada: new FormControl(Date, [Validators.required])
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
      const cpf = localStorage.getItem("cpfClienteExibido")
      
      this.clienteService.getClientePorCpf(cpf).subscribe({
        next: (cliente) => {
          // Cliente encontrado, agora cria a consulta
          const consulta = {
            valor: 300,
            dataMarcada: dataFormatada,
            cliente: {
              cpf: localStorage.getItem("cpfClienteExibido")
            }
          };
  
          console.log(cpf)

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
