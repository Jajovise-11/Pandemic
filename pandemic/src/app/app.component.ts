import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PerfilModule } from './perfil/perfil.module';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PerfilModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pandemic';
}
