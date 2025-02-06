import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../models/ciudad.model';
import { Vacuna } from '../models/vacuna.model';
import { Virus } from '../models/virus.model';
import { Popurri } from '../models/popurri.model';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  partida: Popurri;
  rondas: number = 0;
  accionesDisponibles: number = 4;
  mensajesRonda: string[] = [];
  numeroMaximoBrotes: number = 8;
vacunas: any;
rondaActual: any;
numeroDeBrotes: any;
accionesRestantes: any;

  constructor() {
    this.partida = new Popurri();
  }

  ngOnInit(): void {
    this.inicializarPartida();
  }

  inicializarPartida(): void {
    this.partida.inicializarCiudades();
    this.partida.inicializarVacunas();
    this.partida.infectarCiudadesIniciales();
    this.mensajesRonda.push('¡La partida ha comenzado!');
  }

  realizarAccion(accion: string): void {
    if (this.accionesDisponibles > 0) {
      switch (accion) {
        case 'curar':
          this.curarEnfermedad();
          break;
        case 'investigar':
          this.investigarVacuna();
          break;
        default:
          this.mensajesRonda.push('Acción no reconocida.');
      }
      this.accionesDisponibles--;
    } else {
      this.mensajesRonda.push('No tienes acciones disponibles.');
    }
  }

  curarEnfermedad(): void {
    // Lógica para curar una enfermedad en una ciudad
    const ciudadSeleccionada = this.seleccionarCiudad();
    if (ciudadSeleccionada) {
      const enfermedad = ciudadSeleccionada.enfermedadPrincipal;
      const vacuna = this.partida.obtenerVacunaPorEnfermedad(enfermedad);

      if (vacuna && vacuna.porcentajeDesarrollo === 100) {
        ciudadSeleccionada.nivelesDeInfeccion.set(enfermedad, 0);
        this.mensajesRonda.push(`La infección de ${enfermedad} en ${ciudadSeleccionada.nombre} ha sido completamente curada.`);
      } else {
        const nivelActual = ciudadSeleccionada.nivelesDeInfeccion.get(enfermedad) || 0;
        if (nivelActual > 0) {
          ciudadSeleccionada.nivelesDeInfeccion.set(enfermedad, nivelActual - 1);
          this.mensajesRonda.push(`Se ha reducido la infección de ${enfermedad} en ${ciudadSeleccionada.nombre}.`);
        }
      }
    }
  }

  investigarVacuna(): void {
    const vacunaSeleccionada = this.seleccionarVacuna();
    if (vacunaSeleccionada) {
      const progresoInvestigacion = this.partida.obtenerProgresoInvestigacion();
      vacunaSeleccionada.incrementarDesarrollo(progresoInvestigacion);
      this.mensajesRonda.push(`La investigación de la vacuna ${vacunaSeleccionada.nombre} ha avanzado un ${progresoInvestigacion}%.`);
    }
  }

  finalizarRonda(): void {
    this.rondas++;
    this.accionesDisponibles = 4;
    this.partida.infectarCiudades();
    this.verificarEstadoPartida();
  }

  verificarEstadoPartida(): void {
    if (this.partida.numeroBrotes >= this.numeroMaximoBrotes) {
      this.mensajesRonda.push('Has perdido. El número de brotes ha superado el límite permitido.');
    } else if (this.partida.verificarVictoria()) {
      this.mensajesRonda.push('¡Felicidades! Has desarrollado todas las vacunas y ganado la partida.');
    } else {
      this.mensajesRonda.push(`Ronda ${this.rondas} finalizada.`);
    }
  }

  seleccionarCiudad(): Ciudad | null {
    // Lógica para seleccionar una ciudad (se puede mejorar con un menú gráfico)
    return this.partida.ciudades.length > 0 ? this.partida.ciudades[0] : null;
  }

  seleccionarVacuna(): Vacuna | null {
    return this.partida.vacunas.length > 0 ? this.partida.vacunas[0] : null;
  }
}