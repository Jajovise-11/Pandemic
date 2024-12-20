import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  informacion: string = '';
  dropdownVisible: boolean = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  mostrarRanking() {
    this.informacion = 'Ranking de Puntuaciones:\n1. Jugador1 - 1500\n2. Jugador2 - 1200\n3. Jugador3 - 1000';
  }

  mostrarAutores() {
    this.informacion = 'Autores: Sergio González, Javier Méndez';
  }

  mostrarVersion() {
    this.informacion = 'Versión del juego: 1.0';
  }
}
