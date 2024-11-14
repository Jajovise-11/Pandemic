import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Ciudad } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';
@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nueva-partida.component.html',
  styleUrl: './nueva-partida.component.css'
})
export class NuevaPartidaComponent {

  ciudades:Ciudad[] = [];
    constructor(private cargarJsonService: CargarJsonService){

  }

  ngOninit(){
    this.cargarJsonService.getCiudades().subscribe(response =>{
    this.ciudades = response});
  } 

}
