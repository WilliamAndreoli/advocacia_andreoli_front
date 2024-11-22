import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-layout',
  standalone: true,
  imports: [],
  templateUrl: './cliente-layout.component.html',
  styleUrl: './cliente-layout.component.scss'
})
export class ClienteLayoutComponent {
  token = sessionStorage.getItem("auth-token")
  
  name = sessionStorage.getItem("name")

  constructor() {}

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault(); // Impede o comportamento padrão do link
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout() {
    // Remove todos os itens do sessionStorage relacionados à autenticação
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("userName");
    
    // Se você tiver salvo outras informações do usuário, remova-as também
    sessionStorage.removeItem("userRoles");
    sessionStorage.removeItem("userId");
    
    // Opcionalmente, você pode limpar todo o sessionStorage
    sessionStorage.clear();

    window.location.reload();
  }
}
