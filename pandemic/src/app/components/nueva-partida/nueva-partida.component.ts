import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ciudad } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { CommonModule } from '@angular/common';

interface Vacuna {
  color: 'green' | 'red' | 'blue' | 'yellow';
  turnosRestantes: number;
}

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {
  ciudades: Ciudad[] = [];
  ciudadSeleccionada: Ciudad | null = null;
  vacunasEnDesarrollo: Vacuna[] = [];
  turnos: number = 0;
  juegoTerminado: boolean = false;

  constructor(private cargarJson: CargarJsonService) {}

  ngOnInit(): void {
    this.cargarJson.getCiudades().subscribe(response => {
      this.ciudades = response;
    });
  }

  mostrarInfo(ciudad: Ciudad): void {
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

  calcularProgresoPandemia(ciudad: Ciudad): number {
    const totalEnfermedades = ciudad.diseaseCount.green + ciudad.diseaseCount.red + ciudad.diseaseCount.blue + ciudad.diseaseCount.yellow;
    return Math.min((totalEnfermedades / 4) * 100, 100);
  }

  avanzarTurno(): void {
    if (this.juegoTerminado) return;

    this.turnos++;
    this.evolucionarVirus();
    this.actualizarVacunas();
    this.verificarDerrota();
  }

  evolucionarVirus(): void {
    this.ciudades.forEach(ciudad => {
      for (const color of ['green', 'red', 'blue', 'yellow'] as const) {
        if (Math.random() < 0.5) {
          ciudad.diseaseCount[color] = Math.min(4, ciudad.diseaseCount[color] + 1);
        }
      }
    });

    this.ciudades.forEach(ciudad => {
      for (const color of ['green', 'red', 'blue', 'yellow'] as const) {
        if (ciudad.diseaseCount[color] === 4) {
          ciudad.adyacentes.forEach(nombreCiudad => {
            const ciudadAdyacente = this.ciudades.find(c => c.name === nombreCiudad);
            if (ciudadAdyacente) {
              ciudadAdyacente.diseaseCount[color] = Math.min(4, ciudadAdyacente.diseaseCount[color] + 1);
            }
          });
        }
      }
    });
  }

  desarrollarVacuna(color: 'green' | 'red' | 'blue' | 'yellow'): void {
    if (!this.vacunasEnDesarrollo.some(v => v.color === color)) {
      this.vacunasEnDesarrollo.push({ color, turnosRestantes: 3 });
    }
  }

  actualizarVacunas(): void {
    this.vacunasEnDesarrollo.forEach(vacuna => {
      vacuna.turnosRestantes--;
    });
    
    this.vacunasEnDesarrollo = this.vacunasEnDesarrollo.filter(vacuna => {
      if (vacuna.turnosRestantes <= 0) {
        this.aplicarVacuna(vacuna.color);
        return false;
      }
      return true;
    });
  }

  aplicarVacuna(color: 'green' | 'red' | 'blue' | 'yellow'): void {
    this.ciudades.forEach(ciudad => {
      if (ciudad.diseaseCount[color] > 0) {
        ciudad.diseaseCount[color] = Math.max(0, ciudad.diseaseCount[color] - 2);
      }
    });
  }

  verificarDerrota(): void {
    const juegoPerdido = this.ciudades.every(ciudad => 
      ciudad.diseaseCount.green === 4 &&
      ciudad.diseaseCount.red === 4 &&
      ciudad.diseaseCount.blue === 4 &&
      ciudad.diseaseCount.yellow === 4
    );
    
    if (juegoPerdido) {
      this.juegoTerminado = true;
      alert("¡Has perdido! Todas las ciudades están completamente infectadas.");
    }
  }

  getCoordinates(cityName: string): { x: number, y: number } {
    const city = this.ciudades.find(ciudad => ciudad.name === cityName);
    return city ? city.coordinates : { x: 0, y: 0 };
  }
}
