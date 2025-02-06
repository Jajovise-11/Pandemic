export class Ciudad {
    nombre: string;
    coordenadas: { x: number; y: number };
    enfermedadPrincipal: string;
    nivelesDeInfeccion: Map<string, number> = new Map();
    ciudadesColindantes: Ciudad[] = [];
  
    constructor(nombre: string, x: number, y: number, enfermedadPrincipal: string) {
      this.nombre = nombre;
      this.coordenadas = { x, y };
      this.enfermedadPrincipal = enfermedadPrincipal;
    }
  
    infectar(enfermedad: string) {
      const nivelActual = this.nivelesDeInfeccion.get(enfermedad) || 0;
      if (nivelActual < 3) {
        this.nivelesDeInfeccion.set(enfermedad, nivelActual + 1);
      } else {
        this.propagacionColindantes(enfermedad);
      }
    }
  
    propagacionColindantes(enfermedad: string) {
      this.ciudadesColindantes.forEach(ciudad => ciudad.infectar(enfermedad));
    }
  }
  