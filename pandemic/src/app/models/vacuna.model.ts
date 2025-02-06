export class Vacuna {
    nombre: string;
    color: string;
    porcentajeDesarrollo: number;
  
    constructor(nombre: string, color: string) {
      this.nombre = nombre;
      this.color = color;
      this.porcentajeDesarrollo = 0;
    }
  
    desarrollarVacuna(porcentaje: number) {
      this.porcentajeDesarrollo = Math.min(100, this.porcentajeDesarrollo + porcentaje);
    }
  
    estaDesarrollada(): boolean {
      return this.porcentajeDesarrollo === 100;
    }
}