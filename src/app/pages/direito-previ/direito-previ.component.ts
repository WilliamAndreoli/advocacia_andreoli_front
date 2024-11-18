import { Component } from '@angular/core';
import { ContatoComponent } from '../../contato/contato.component';
import { AcessoRapidoComponent } from '../../acesso-rapido/acesso-rapido.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';

@Component({
  selector: 'app-direito-previ',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    DireitoPreviComponent,
    ContatoComponent,
    ContatoComponent,
    AcessoRapidoComponent,
    RodapeComponent
  ],
  templateUrl: './direito-previ.component.html',
  styleUrl: './direito-previ.component.scss'
})
export class DireitoPreviComponent {

}
