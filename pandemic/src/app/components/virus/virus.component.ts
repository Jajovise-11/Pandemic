import { Component, Input } from '@angular/core';
import { Virus } from '../../models/virus.model';

@Component({
  selector: 'app-virus',
  standalone: true,
  imports: [],
  templateUrl: './virus.component.html',
  styleUrl: './virus.component.css'
})
export class VirusComponent {
  @Input() virus!: Virus;

  mostrarInformacion() {
    alert(`Virus: ${this.virus.nombre} - Color: ${this.virus.color}`);
  }
}
