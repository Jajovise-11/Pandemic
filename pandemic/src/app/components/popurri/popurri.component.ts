import { Component, OnInit } from '@angular/core'; 
import { Ciudad } from '../../models/ciudad.model'; // Importa el modelo correcto
import { Vacuna } from '../../models/vacuna.model';

@Component({
  selector: 'app-popurri',
  templateUrl: './popurri.component.html',
  styleUrls: ['./popurri.component.css']
})
export class PopurriComponent implements OnInit {
  ciudades: Ciudad[] = [];
  vacunas: Vacuna[] = [];
  rondaActual: number = 0;
  numeroDeBrotes: number = 0;
  accionesRestantes: number = 4;
  mensajesRonda: string[] = [];

  ngOnInit() {
    this.inicializarPartida();
  }

  inicializarPartida() {
    this.ciudades = [
      new Ciudad('Ciudad A', 0, 0, 'Virus A'),
      new Ciudad('Ciudad B', 1, 1, 'Virus B')
    ];

    const vacunasData = [
      new Vacuna('Vacuna A', 'Rojo'),
      new Vacuna('Vacuna B', 'Azul')
    ];
  }

  finalizarRonda() {
    this.rondaActual++;
    this.numeroDeBrotes++;
    this.mensajesRonda.push(`Ronda ${this.rondaActual} finalizada.`);
    this.mostrarMensajesRonda();
  }

  curarEnfermedad(ciudad: Ciudad) {
    if (this.accionesRestantes > 0) {
      const enfermedad = ciudad.enfermedadPrincipal;
      ciudad.enfermedadPrincipal = '';
      this.accionesRestantes--;
      this.mensajesRonda.push(`Se ha curado ${enfermedad} en la ciudad de ${ciudad.name}`);
    } else {
      this.mensajesRonda.push('No quedan acciones disponibles para curar enfermedades.');
    }
  }

  investigarVacuna(vacuna: Vacuna) {
    if (this.accionesRestantes >= 4) {
      vacuna.color = 'Investigada';
      this.accionesRestantes -= 4;
      this.mensajesRonda.push(`Se ha investigado la vacuna ${vacuna.nombre}.`);
    } else {
      this.mensajesRonda.push('No hay suficientes acciones para investigar una vacuna.');
    }
  }

  mostrarMensajesRonda(): void {
    alert(this.mensajesRonda.join('\n'));
    this.mensajesRonda = []; // Limpiar mensajes después de mostrarlos
  }
}