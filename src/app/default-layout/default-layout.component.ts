import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault(); // Impede o comportamento padrão do link
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
