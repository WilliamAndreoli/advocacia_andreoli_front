import { Component } from '@angular/core';
import { ContatoComponent } from '../../contato/contato.component';
import { AcessoRapidoComponent } from '../../acesso-rapido/acesso-rapido.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';

@Component({
  selector: 'app-direito-civil',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    DireitoCivilComponent,
    ContatoComponent,
    ContatoComponent,
    AcessoRapidoComponent,
    RodapeComponent
  ],
  templateUrl: './direito-civil.component.html',
  styleUrl: './direito-civil.component.scss'
})
export class DireitoCivilComponent {

}