import { Component, OnInit } from '@angular/core';
import { ClienteLayoutComponent } from '../../layout/cliente-layout/cliente-layout.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    ClienteLayoutComponent
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit{
  username = sessionStorage.getItem("userName");
  name = sessionStorage.getItem("name");
  
  ngOnInit() {
    this.carregarProcessos();
  }

  carregarProcessos() {
    console.log("carregar processos")
  }

}