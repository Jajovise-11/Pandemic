import { Component, Input } from '@angular/core';
import { Ciudad } from '../../models/ciudad.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.css'
})
export class CiudadComponent {
  @Input() ciudad!: Ciudad;

  getNivelesDeInfeccion() {
    return Array.from(this.ciudad.nivelesDeInfeccion.entries());
  }
}
