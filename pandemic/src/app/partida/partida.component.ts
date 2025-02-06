import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ciudades } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class PartidaComponent implements OnInit {
  ciudades: Ciudades[] = [];
  ciudadSeleccionada: Ciudades | null = null;

  constructor(private cargarJson: CargarJsonService) {}

  ngOnInit(): void {
    this.cargarJson.getCiudades().subscribe(response => {
      this.ciudades = response;
    });
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

  calcularProgresoPandemia(ciudad: Ciudades): number {
    const totalEnfermedades = ciudad.diseaseCount.green + ciudad.diseaseCount.red + ciudad.diseaseCount.blue + ciudad.diseaseCount.yellow;
    return Math.min((totalEnfermedades / 4) * 100, 100);
  }

  vacunas: string[] = ['Verde', 'Rojo', 'Azul', 'Amarillo'];
  vacunaSeleccionada: string = this.vacunas[0];

}

