import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatoService } from '../services/contato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent {
  contatoForm: FormGroup;

  constructor(private fb: FormBuilder, private contatoService: ContatoService, private toastService: ToastrService) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      conteudo: ['', Validators.required],
    });
  }

  onSubmit() {
    this.contatoService.enviarMensagem(this.contatoForm.value).subscribe({
      next: (res) => {
        this.toastService.success("Mensagem enviada com sucesso");
      },
      error: (err) => {
        this.toastService.error('Erro ao enviar mensagem:', err);
      },
    });
  }
}

