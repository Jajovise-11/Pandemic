import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
//import { Ciudad } from '../../models/ciudades.model';
import { CargarJsonService } from '../../services/cargar-json.service';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {
  informacion: string= "";

  mostrarInformacion() {
    this.informacion = '';
  }

  //ciudades:Ciudad[] = [];
 //constructor(private cargarJson: CargarJsonService){

  //}

 //ngOninit(){
  // this.cargarJson.getCiudades.subscribe(response =>(
  //  this.ciudades = response));
  //} 
  
}
