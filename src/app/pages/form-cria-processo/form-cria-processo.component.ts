import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcessoService } from '../../services/processo.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../services/cliente.service';
import { AdvogadoService } from '../../services/advogado.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatOptionModule } from '@angular/material/core';
import { map, Observable, of, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-form-cria-processo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    MatOptionModule
  ],
  templateUrl: './form-cria-processo.component.html',
  styleUrl: './form-cria-processo.component.scss'
})
export class FormCriaProcessoComponent implements OnInit{
  processoForm!: FormGroup;
  advogados = [];
  clientes = [];
  filteredAdvogados: Observable<any[]> | undefined;
  filteredClientes: Observable<any[]> | undefined;
  cpf: string = '';

  constructor(
    private processoService: ProcessoService,
    private toastService: ToastrService,
    private clienteService: ClienteService,
    private advogadoService: AdvogadoService
  ) {
      this.processoForm = new FormGroup({
        numeroProcesso: new FormControl('', Validators.required),
        juiz: new FormControl(''),
        area: new FormControl('', [Validators.required]),
        comarca: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        valor_processo: new FormControl('', [Validators.required]),
        advogado: new FormControl([''], [Validators.required]),
        cliente: new FormControl([''], [Validators.required]),
      })
  }

  ngOnInit() {
    this.clienteService.getAllClientes().subscribe({
      next: (response) => {
        //console.log(response)
        this.clientes = response;
      }
    });
    this.advogadoService.getAllAdvogados().subscribe({
      next: (response) => {
        //console.log(response)
        this.advogados = response;
      }
    });

    this.filteredAdvogados = this.processoForm.get('advogado')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.advogados))
    );

    //console.log(this.filteredAdvogados)
    this.filteredClientes = this.processoForm.get('cliente')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.clientes))
    );

  }

  

  private _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();

    if (!Array.isArray(options)) {
      console.error('Options não é um array:', options);
      return [];
    }

    return options.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  async createProcesso() {
    if (this.processoForm.valid) {
      const formValues = this.processoForm.value;
  
      try {
        const clienteCpf = await this.buscaCliente(formValues.cliente);
        const advogadoNumeroOrdem = await this.buscaAdvogado(formValues.advogado);

        const cliente = {
          cpf: clienteCpf
        }

        const advogado = {
          numeroOrdem: advogadoNumeroOrdem
        }

        const processo = {
          numeroProcesso: formValues.numeroProcesso,
          juiz: formValues.juiz,
          area: formValues.area,
          comarca: formValues.comarca,
          status: formValues.status,
          valor_processo: formValues.valor_processo,
          advogado: advogado,
          cliente: cliente, // Agora o CPF do cliente é passado corretamente
        };
  
        //console.log(processo);
      
        this.processoService.createProcesso(processo).subscribe({
          next: (response) => {
            this.toastService.success('Processo criado com sucesso!');
            //console.log(response);
            this.processoForm.reset(); // Limpa o formulário
          },
          error: (error) => {
            this.toastService.error("Erro ao criar o cliente!");
          }
        });
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        this.toastService.error("Erro ao buscar o cliente.");
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  buscaCliente(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.clienteService.getClientePorNome(nome).subscribe({
        next: (cliente) => {
          console.log(nome);
          console.log(cliente.cpf);
          resolve(cliente.cpf); // Retorna o cpf quando o cliente é encontrado
        },
        error: (err) => reject(err) // Em caso de erro, rejeita a Promise
      });
    });
  }

  buscaAdvogado(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.advogadoService.getAdvogadoPorNome(nome).subscribe({
        next: (advogado) => {
          console.log(nome);
          console.log(advogado.numeroOrdem);
          resolve(advogado.numeroOrdem); 
        },
        error: (err) => reject(err) 
      });
    });
  }

}

