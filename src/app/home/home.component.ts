import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { ProfissionalComponent } from '../profissional/profissional.component';
import { AtuacaoComponent } from '../atuacao/atuacao.component';
import { ContatoComponent } from '../contato/contato.component';
import { AcessoRapidoComponent } from '../acesso-rapido/acesso-rapido.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    ProfissionalComponent,
    AtuacaoComponent,
    ContatoComponent,
    AcessoRapidoComponent,
    RodapeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
 
}
