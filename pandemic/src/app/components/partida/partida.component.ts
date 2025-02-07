import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../../models/ciudad.model';
import { Vacuna } from '../../models/vacuna.model';
import { Popurri } from '../../models/popurri.model';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  ciudades: Ciudad[] = [];
  vacunas: Vacuna[] = [];
  rondaActual: number = 0;
  numeroDeBrotes: number = 0;
  accionesRestantes: number = 4;
  mensajesRonda: string[] = [];

  partida: Popurri;

  constructor() {
    this.partida = new Popurri(5);
  }

  ngOnInit(): void {
    this.inicializarPartida();
  }

  inicializarPartida(): void {
    const ciudadesData = [
      { nombre: 'Ciudad A', x: 0, y: 0, enfermedadPrincipal: 'Virus A' },
      { nombre: 'Ciudad B', x: 1, y: 1, enfermedadPrincipal: 'Virus B' }
    ];
    const vacunasData = [
      { nombre: 'Vacuna A', color: 'Rojo' },
      { nombre: 'Vacuna B', color: 'Azul' }
    ];

    this.partida.inicializarCiudades(ciudadesData);
    this.partida.inicializarVacunas(vacunasData);

    this.ciudades = this.partida.ciudades;
    this.vacunas = this.partida.vacunas;
  }

  finalizarRonda(): void {
    this.partida.rondas++;
    this.rondaActual = this.partida.rondas;
    this.numeroDeBrotes = this.partida.numeroDeBrotes;
    this.mensajesRonda.push(`Ronda ${this.rondaActual} finalizada.`);
    this.mostrarMensajesRonda();
  }

  curarEnfermedad(ciudad: Ciudad): void {
    if (this.accionesRestantes > 0) {
      const enfermedad = ciudad.enfermedadPrincipal;
      this.partida.curarCiudad(ciudad, enfermedad);
      this.accionesRestantes--;
      this.mensajesRonda.push(`Se ha curado ${enfermedad} en la ciudad de ${ciudad.nombre}`);
    } else {
      this.mensajesRonda.push('No quedan acciones disponibles para curar enfermedades.');
    }
  }

  investigarVacuna(vacuna: Vacuna): void {
    if (this.accionesRestantes >= 4) {
      this.partida.investigarVacuna(vacuna, 20);
      this.accionesRestantes -= 4;
      this.mensajesRonda.push(`Se ha investigado la vacuna ${vacuna.nombre}.`);
    } else {
      this.mensajesRonda.push('No hay suficientes acciones para investigar una vacuna.');
    }
  }

  mostrarMensajesRonda(): void {
    alert(this.mensajesRonda.join('\n'));
    this.mensajesRonda = [];
  }
}
