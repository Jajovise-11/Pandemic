import { Ciudad } from "./ciudad.model";
import { Vacuna } from "./vacuna.model";

export class Popurri {
    verificarVictoria() {
      throw new Error('Method not implemented.');
    }
    ciudades: Ciudad[] = [];
    vacunas: Vacuna[] = [];
    numeroDeBrotes: number = 0;
    brotesMaximos: number;
    accionesPorRonda: number = 4;
    rondas: number = 0;
  
    constructor(brotesMaximos: number) {
      this.brotesMaximos = brotesMaximos;
    }
  
    inicializarCiudades(ciudadesData: { nombre: string; x: number; y: number; enfermedadPrincipal: string }[]) {
      this.ciudades = ciudadesData.map(data => new Ciudad(data.nombre, data.x, data.y, data.enfermedadPrincipal));
    }
  
    inicializarVacunas(vacunasData: { nombre: string; color: string }[]) {
      this.vacunas = vacunasData.map(data => new Vacuna(data.nombre, data.color));
    }
  
    infectarCiudades(cantidad: number) {
      for (let i = 0; i < cantidad; i++) {
        const ciudadAleatoria = this.ciudades[Math.floor(Math.random() * this.ciudades.length)];
        ciudadAleatoria.infectar(ciudadAleatoria.enfermedadPrincipal);
      }
    }
  
    investigarVacuna(vacuna: Vacuna, porcentaje: number) {
      vacuna.desarrollarVacuna(porcentaje);
    }
  
    curarCiudad(ciudad: Ciudad, enfermedad: string) {
      const vacunaDesarrollada = this.vacunas.find(v => v.nombre === enfermedad)?.estaDesarrollada();
  
      if (vacunaDesarrollada) {
        ciudad.nivelesDeInfeccion.set(enfermedad, 0);
      } else {
        const nivelActual = ciudad.nivelesDeInfeccion.get(enfermedad) || 0;
        ciudad.nivelesDeInfeccion.set(enfermedad, Math.max(0, nivelActual - 1));
      }
    }
  
    verificarEstadoDelJuego(): string {
      if (this.numeroDeBrotes >= this.brotesMaximos) {
        return 'Derrota: Se alcanzó el límite de brotes.';
      }
  
      const todasVacunasDesarrolladas = this.vacunas.every(v => v.estaDesarrollada());
      if (todasVacunasDesarrolladas) {
        return 'Victoria: Se desarrollaron todas las vacunas.';
      }
  
      return 'El juego continúa.';
    }
  }