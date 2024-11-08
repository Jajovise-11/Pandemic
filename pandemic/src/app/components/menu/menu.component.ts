import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  informacion: string = '';

  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([name]); // Cambia esta línea
  }

  nuevaPartida() {
    this.informacion = 'Iniciando una nueva partida...';
  }

  cargarPartida() {
    this.informacion = 'Cargando la partida guardada...';
  }

  mostrarInformacion() {
    this.informacion = '';
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
