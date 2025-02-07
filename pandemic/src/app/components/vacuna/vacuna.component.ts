import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacuna } from '../../models/vacuna.model';

@Component({
  selector: 'app-vacuna',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacuna.component.html',
  styleUrl: './vacuna.component.css'
})
export class VacunaComponent {
  @Input() vacuna!: Vacuna;

  investigarVacuna() {
    if (!this.vacuna.estaDesarrollada()) {
      this.vacuna.desarrollar(10); // Incremento fijo del 10% por investigación
    } else {
      alert(`La vacuna ${this.vacuna.nombre} ya está completamente desarrollada.`);
    }
  }
}
