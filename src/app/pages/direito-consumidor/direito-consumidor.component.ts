import { Component } from '@angular/core';
import { ContatoComponent } from '../../contato/contato.component';
import { AcessoRapidoComponent } from '../../acesso-rapido/acesso-rapido.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { LoginLayoutComponent } from '../../login-layout/login-layout.component';

@Component({
  selector: 'app-direito-consumidor',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    DireitoConsumidorComponent,
    ContatoComponent,
    ContatoComponent,
    AcessoRapidoComponent,
    RodapeComponent
  ],
  templateUrl: './direito-consumidor.component.html',
  styleUrl: './direito-consumidor.component.scss'
})
export class DireitoConsumidorComponent {

}
