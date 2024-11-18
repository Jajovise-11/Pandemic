import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {
  informacion: string= "";

  mostrarInformacion() {
    this.informacion = '';
  }

}
