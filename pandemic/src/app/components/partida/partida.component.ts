import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../../models/ciudad.model';
import { Vacuna } from '../../models/vacuna.model';
import { CargarJsonService } from '../../services/cargar-json.service';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  ciudades: Ciudad[] = [];
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
    // Cargar las ciudades desde el servicio
    this.cargarJson.getCiudades().subscribe(response => {
      this.ciudades = response;
    });
    
    // Cargar las vacunas manualmente o desde un servicio si está disponible
    this.vacunas = [
      { nombre: 'Vacuna Verde', color: 'verde' },
      { nombre: 'Vacuna Roja', color: 'rojo' },
      { nombre: 'Vacuna Azul', color: 'azul' },
      { nombre: 'Vacuna Amarilla', color: 'amarillo' }
    ];
  }

  mostrarInfo(ciudad: Ciudad): void {
    this.ciudadSeleccionada = ciudad;
  }

  mostrarInfoDesdeDropdown(event: any): void {
    const ciudadSeleccionada = this.ciudades.find(
      ciudad => ciudad.nombre === event.target.value
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

  curarCiudad(ciudad: Ciudad): void {
    if (ciudad.enfermedadPrincipal) {
      this.mensajesRonda.push(`Enfermedad ${ciudad.enfermedadPrincipal} curada en ${ciudad.nombre}.`);
      ciudad.enfermedadPrincipal = ''; // Marca como curada
    } else {
      this.mensajesRonda.push(`No hay enfermedad que curar en ${ciudad.nombre}.`);
    }
  }

  investigarVacuna(vacuna: Vacuna): void {
    if (vacuna) {
      this.mensajesRonda.push(`Investigación para la vacuna ${vacuna.nombre} iniciada.`);
    }
  }

  finalizarRonda(): void {
    this.rondas++;
    this.mensajesRonda.push(`Ronda ${this.rondas} finalizada.`);
  }

  calcularProgresoPandemia(ciudad: Ciudad): number {
    // Ejemplo simple para el progreso
    return Math.min(100, (ciudad.diseaseCount.green + ciudad.diseaseCount.red + ciudad.diseaseCount.blue + ciudad.diseaseCount.yellow) * 10);
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