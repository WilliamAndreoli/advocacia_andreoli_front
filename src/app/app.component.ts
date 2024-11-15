import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DefaultLayoutComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'advocacia_andreoli_front';
}
