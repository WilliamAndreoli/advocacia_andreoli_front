import { Component } from '@angular/core';
import { ContatoComponent } from '../../contato/contato.component';
import { AcessoRapidoComponent } from '../../acesso-rapido/acesso-rapido.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';


@Component({
  selector: 'app-direito-trabalho',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    DireitoTrabalhoComponent,
    ContatoComponent,
    ContatoComponent,
    AcessoRapidoComponent,
    RodapeComponent
  ],
  templateUrl: './direito-trabalho.component.html',
  styleUrl: './direito-trabalho.component.scss'
})
export class DireitoTrabalhoComponent {

}
