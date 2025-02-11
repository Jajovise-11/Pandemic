/*export class Ciudad {
    name: string;
    coordinates: { x: number; y: number };
    enfermedadPrincipal: string;
    diseaseCount: Map<string, number> = new Map();
    ciudadesColindantes: Ciudad[] = [];
    x: any;
    y: any;
  
    constructor(nombre: string, x: number, y: number, enfermedadPrincipal: string) {
      this.name = nombre;
      this.coordinates = { x, y };
      this.enfermedadPrincipal = enfermedadPrincipal;
    }
  
    infectar(enfermedad: string) {
      const nivelActual = this.diseaseCount.get(enfermedad) || 0;
      if (nivelActual < 3) {
        this.diseaseCount.set(enfermedad, nivelActual + 1);
      } else {
        this.propagacionColindantes(enfermedad);
      }
    }
  
    propagacionColindantes(enfermedad: string) {
      this.ciudadesColindantes.forEach(ciudad => ciudad.infectar(enfermedad));
    }
  }
  */