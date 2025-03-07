import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ciudad } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vacuna {
  color: 'green' | 'red' | 'blue' | 'yellow';
  turnosRestantes: number;
}

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {
  ciudades: Ciudad[] = [];
  ciudadSeleccionada: Ciudad | null = null;
  vacunasEnDesarrollo: Vacuna[] = [];
  vacunasDisponibles: Record<'green' | 'red' | 'blue' | 'yellow', number> = {
    green: 0,
    red: 0,
    blue: 0,
    yellow: 0
  };
  turnos: number = 0;
  juegoTerminado: boolean = false;
  vacunaSeleccionada: 'green' | 'red' | 'blue' | 'yellow' | null = null;
  mensajeFinal: string | null = null;
  derrota: boolean = false;
  victoria: boolean = false;
  mostrarAyuda: boolean = false;
  accionesDisponibles: number = 4;
  constructor(private cargarJson: CargarJsonService) {}

  ngOnInit(): void {
    this.cargarJson.getCiudades().subscribe(response => {
      if (response && response.length > 0) {
        this.ciudades = response;
      } else {
        console.error('No se encontraron ciudades.');
      }
    }, error => {
      console.error('Error al cargar las ciudades:', error);
    });
  }

  gastarAccion(): void {
    if (this.accionesDisponibles > 0) {
      this.accionesDisponibles--;
    }
  }

  restaurarAcciones(): void {
    this.accionesDisponibles = 4;
  }

  
  mostrarInfo(ciudad: Ciudad): void {
    this.ciudadSeleccionada = ciudad;
    setTimeout(() => {
      document.getElementById('info-ciudad')?.classList.add('mostrar');
    }, 10);
  }

  cerrarInfo(): void {
    document.getElementById('info-ciudad')?.classList.remove('mostrar');
    setTimeout(() => {
      this.ciudadSeleccionada = null;
    }, 300);
  }

  getButtonColor(ciudad: Ciudad): string {
    const maxNivel = Math.max(...Object.values(ciudad.diseaseCount) as number[]);
    return ['green', 'yellow', 'orange', 'purple', 'red'][maxNivel];
  }

  evolucionarVirus(): void {
    if (!this.ciudades || this.ciudades.length === 0) {
      return;
    }
  
    this.ciudades.forEach(ciudad => {
      for (const color of ['green', 'red', 'blue', 'yellow'] as const) {
        if (Math.random() < 0.1) { 
          ciudad.diseaseCount[color] = Math.min(4, ciudad.diseaseCount[color] + 1);
        }
      }
    });
  }
  
  
  mostrarInfoDesdeDropdown(event: any): void {
    const ciudadSeleccionada = this.ciudades.find(
      ciudad => ciudad.name === event.target.value
    );
    if (ciudadSeleccionada) {
      this.mostrarInfo(ciudadSeleccionada);
    }
  }

  getTotalInfection(ciudad: Ciudad): number {
    return ciudad.diseaseCount.green + ciudad.diseaseCount.red + ciudad.diseaseCount.blue + ciudad.diseaseCount.yellow;
  }

  getInfectionLevel(ciudad: any): number {
    const counts = Object.values(ciudad.diseaseCount);
    const maxInfection = Math.max(...counts as number[]);
    return Math.min(maxInfection, 4);
  }
  
  desarrollarVacuna(color: 'green' | 'red' | 'blue' | 'yellow'): void {
    if (this.accionesDisponibles < 2) {
      alert('Necesitas al menos 2 acciones para desarrollar una vacuna.');
      return;
    }
  
    if (this.vacunasEnDesarrollo.length >= 2) {
      alert('Solo puedes desarrollar hasta 2 vacunas a la vez.');
      return;
    }
  
    this.vacunasEnDesarrollo.push({ color, turnosRestantes: 2 });
    this.accionesDisponibles -= 2;
  }

  actualizarVacunas(): void {
    this.vacunasEnDesarrollo.forEach(vacuna => {
      vacuna.turnosRestantes--;
    });

    this.vacunasEnDesarrollo = this.vacunasEnDesarrollo.filter(vacuna => {
      if (vacuna.turnosRestantes <= 0) {
        this.vacunasDisponibles[vacuna.color] += 1;
        return false;
      }
      return true;
    });
  }

  aplicarVacuna(color: 'green' | 'red' | 'blue' | 'yellow'): void {
    if (this.accionesDisponibles === 0) {
      alert('No tienes acciones disponibles, salta el turno.');
      return;
    }
  
    if (this.vacunasDisponibles[color] > 0) {
      if (this.ciudadSeleccionada && this.ciudadSeleccionada.diseaseCount[color] > 0) {
        this.ciudadSeleccionada.diseaseCount[color] = Math.max(0, this.ciudadSeleccionada.diseaseCount[color] - 2);
      }
  
      this.vacunasDisponibles[color]--;
      this.gastarAccion();
    } else {
      alert(`No tienes vacunas disponibles de color ${color}`);
    }
  }

  verificarEstadoJuego(): void {
    const juegoPerdido = this.ciudades.every(ciudad =>
      ciudad.diseaseCount.green === 4 &&
      ciudad.diseaseCount.red === 4 &&
      ciudad.diseaseCount.blue === 4 &&
      ciudad.diseaseCount.yellow === 4
    );

    if (juegoPerdido) {
      this.juegoTerminado = true;
      this.mensajeFinal = "¡Has perdido! Todas las ciudades están completamente infectadas.";
    }

    const juegoGanado = this.ciudades.every(ciudad =>
      ciudad.diseaseCount.green === 0 &&
      ciudad.diseaseCount.red === 0 &&
      ciudad.diseaseCount.blue === 0 &&
      ciudad.diseaseCount.yellow === 0
    );

    if (juegoGanado) {
      this.juegoTerminado = true;
      this.mensajeFinal = "¡Has ganado! Has eliminado todas las infecciones.";
    }
  }

  verificarVictoriaODerrota() {
    if (this.derrota) {
      this.mensajeFinal = "¡Has perdido! La infección ha dominado el mundo.";
    } else if (this.victoria) {
      this.mensajeFinal = "¡Felicidades! Has desarrollado todas las vacunas y ganado.";
    } else {
      this.mensajeFinal = null; 
    }
  }

  avanzarTurno(): void {
    if (this.juegoTerminado) return;
  
    this.turnos++;
    this.restaurarAcciones();
  
    if (this.turnos === 1) {
      this.infectarCiudadesIniciales();
    } else {
      this.evolucionarVirus();
    }
  
    this.actualizarVacunas();
    this.verificarEstadoJuego();
  }

  infectarCiudadesIniciales(): void {
    const ciudadesDisponibles = [...this.ciudades];
    for (let i = 0; i < 5; i++) {
      if (ciudadesDisponibles.length === 0) break;
      
      const indiceAleatorio = Math.floor(Math.random() * ciudadesDisponibles.length);
      const ciudad = ciudadesDisponibles.splice(indiceAleatorio, 1)[0];
  
      const colores: ('green' | 'red' | 'blue' | 'yellow')[] = ['green', 'red', 'blue', 'yellow'];
      const colorAleatorio = colores[Math.floor(Math.random() * colores.length)] as 'green' | 'red' | 'blue' | 'yellow';
  
      ciudad.diseaseCount[colorAleatorio] = 1;
    }
  }
  
  getCoordinates(cityName: string): { x: number, y: number } {
    const city = this.ciudades.find(ciudad => ciudad.name === cityName);
    return city ? city.coordinates : { x: 0, y: 0 };
  }

  toggleAyuda() {
    this.mostrarAyuda = !this.mostrarAyuda;
  }
}
