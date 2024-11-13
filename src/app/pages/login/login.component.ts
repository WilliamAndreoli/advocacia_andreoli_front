import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../default-layout/default-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
