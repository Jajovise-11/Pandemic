import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})

export class PerfilUsuarioComponent {
  vistaActual: string = 'juegos';

  juegos = [
    { nombre: 'NBA 2k25', horas: 1365 },
    { nombre: 'Darks Souls 3', horas: 1589 },
    { nombre: 'FIFA 24', horas: 2568 }
  ];

  logros = [
    { nombre: 'Primer Victoria', completado: true },
    { nombre: 'Nivel 10', completado: true },
    { nombre: 'Campeón del Torneo', completado: true }
  ];

  mostrarJuegos() {
    this.vistaActual = 'juegos';
  }

  mostrarLogros() {
    this.vistaActual = 'logros';
  }
}
