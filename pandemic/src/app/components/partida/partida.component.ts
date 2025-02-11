import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vacuna } from '../../models/vacuna.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { Ciudades } from '../../models/ciudades.model';
@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  ciudades: Ciudades[] = [];
  ciudadSeleccionada: Ciudad | null = null;
  vacunas: Vacuna[] = [];
  vacunaSeleccionada: Vacuna | null = null;
  rondas: number = 0;
  numeroDeBrotes: number = 0;
  mensajesRonda: string[] = [];
  rondaActual: number = 0;
  accionesRestantes: number = 4;

  constructor(private cargarJson: CargarJsonService) {}

  ngOnInit(): void {
    this.cargarJson.getCiudades().subscribe(response => {
      this.ciudades = response;
    });
    
    
  }

  inicializarVacunas() {
    this.vacunas = [
      new Vacuna('Vacuna Verde', 'verde'),
      new Vacuna('Vacuna Roja', 'rojo'),
      new Vacuna('Vacuna Azul', 'azul'),
      new Vacuna('Vacuna Amarilla', 'amarillo'),
    ];
  }

  mostrarInfo(ciudad: Ciudades): void {
    this.ciudadSeleccionada = ciudad;
  }

  mostrarInfoDesdeDropdown(event: any): void {
    const ciudadSeleccionada = this.ciudades.find(
      ciudad => ciudad.name === event.target.value
    );
    if (ciudadSeleccionada) {
      this.mostrarInfo(ciudadSeleccionada);
    }
  }

  seleccionarVacuna(event: any): void {
    this.vacunaSeleccionada = this.vacunas.find(
      vacuna => vacuna.nombre === event.target.value
    ) || null;
  }

  curarCiudad(ciudad: Ciudades): void {
    if (ciudad.enfermedadPrincipal) {
      this.mensajesRonda.push(`Enfermedad ${ciudad.enfermedadPrincipal} curada en ${ciudad.name}.`);
      ciudad.enfermedadPrincipal = '';
    } else {
      this.mensajesRonda.push(`No hay enfermedad que curar en ${ciudad.name}.`);
    }
  }

  investigarVacuna(vacuna: Vacuna): void {
    const progreso = 10;
    vacuna.desarrollarVacuna(progreso);

    if (vacuna.estaDesarrollada()) {
      this.mensajesRonda.push(`¡La ${vacuna.nombre} está completamente desarrollada!`);
    } else {
      this.mensajesRonda.push(`Investigación para la ${vacuna.nombre} aumentó a ${vacuna.porcentajeDesarrollo}%.`);
    }
  }

  finalizarRonda(): void {
    this.rondas++;
    this.mensajesRonda.push(`Ronda ${this.rondas} finalizada.`);
  }

  calcularProgresoPandemia(ciudades: Ciudad): number {
    return Math.min(100, (ciudades.diseaseCount.green + ciudades.diseaseCount.rojo + ciudades.diseaseCount.blue + ciudades.diseaseCount.yellow) * 10);
  }


  
  getCityCoordinates(cityName: string): { x: number, y: number } | null {
    const city = this.ciudades.find(ciudad => ciudad.name === cityName);
    return city ? city.coordinates : null;
  }

  isConnectionRendered(source: string, target: string): boolean {
    return this.renderedConnections.has(`${source}-${target}`) ||
      this.renderedConnections.has(`${target}-${source}`);
  }

  renderedConnections: Set<string> = new Set();
}