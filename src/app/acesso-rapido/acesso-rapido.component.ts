import { Component } from '@angular/core';

@Component({
  selector: 'app-acesso-rapido',
  standalone: true,
  imports: [],
  templateUrl: './acesso-rapido.component.html',
  styleUrl: './acesso-rapido.component.scss'
})
export class AcessoRapidoComponent {
  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault(); // Impede o comportamento padrão do link
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
