import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cargar-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cargar-partida.component.html',
  styleUrl: './cargar-partida.component.css'
})
export class CargarPartidaComponent {

}
