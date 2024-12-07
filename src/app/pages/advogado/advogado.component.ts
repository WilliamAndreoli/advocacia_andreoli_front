import { Component, OnInit } from '@angular/core';
import { AdvLayoutComponent } from '../../layout/adv-layout/adv-layout.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advogado',
  standalone: true,
  imports: [
    AdvLayoutComponent
  ],
  templateUrl: './advogado.component.html',
  styleUrl: './advogado.component.scss'
})
export class AdvogadoComponent implements OnInit{
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
