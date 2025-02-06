import { Component, Input } from '@angular/core';
import { Vacuna } from '../models/vacuna.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacuna',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacuna.component.html',
  styleUrl: './vacuna.component.css'
})
export class VacunaComponent {
  @Input() vacuna!: Vacuna;

  progresoDesarrollo(): string {
    return `${this.vacuna.porcentajeDesarrollo}%`;
  }
}