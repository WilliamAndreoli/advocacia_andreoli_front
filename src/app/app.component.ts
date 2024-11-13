import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'advocacia_andreoli_front';
}
