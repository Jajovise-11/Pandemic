import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ciudad } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {
  ciudades: Ciudad[] = [];
  ciudadSeleccionada: Ciudad | null = null;

  constructor(private cargarJson: CargarJsonService) {}

  ngOnInit(): void {
    this.cargarJson.getCiudades().subscribe(response => {
      this.ciudades = response;
    });
  }

  mostrarInfo(ciudad: Ciudad): void {
    this.ciudadSeleccionada = ciudad;
  }
}


