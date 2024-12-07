import { Component, OnInit } from '@angular/core';
import { ClienteLayoutComponent } from '../../layout/cliente-layout/cliente-layout.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.loginService.isTokenExpired()) {
      //console.log("Token expirado, por favor faça login novamente.");
      this.router.navigate(['/login']);
    } else {
      //console.log("Token válido, pode prosseguir.");
    }
  }

}
