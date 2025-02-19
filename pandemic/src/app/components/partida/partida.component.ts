import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vacuna } from '../../models/vacuna.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { Ciudades } from '../../models/ciudades.model';
import { Ciudad } from '../../models/ciudad.model';
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

  seleccionarCiudad(ciudad: any) {
    alert(`Ciudad: ${ciudad.name}\nEnfermedad: ${ciudad.enfermedadPrincipal || 'Sin enfermedad'}`);
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
    this.ciudadSeleccionada = new Ciudad(ciudad.name, ciudad.x, ciudad.y, ciudad.enfermedadPrincipal);
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
    return Math.min(100, 
        ((ciudades.diseaseCount.get("green") || 0) +
         (ciudades.diseaseCount.get("red") || 0) +
         (ciudades.diseaseCount.get("blue") || 0) +
         (ciudades.diseaseCount.get("yellow") || 0)) * 10
    );
  }

  getCityCoordinates(ciudadNombre: string) {
    const ciudad = this.ciudades.find(c => c.name === ciudadNombre);
    if (!ciudad) return null;

    return {
      x: Math.min(Math.max(ciudad.coordinates.x, 10), 990), // Ajusta los límites
      y: Math.min(Math.max(ciudad.coordinates.y, 10), 590)
    };
  }

  isConnectionRendered(source: string, target: string): boolean {
    return this.renderedConnections.has(`${source}-${target}`) ||
      this.renderedConnections.has(`${target}-${source}`);
  }

  renderedConnections: Set<string> = new Set();
}