import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarJsonService {
  getVacunas() {
    throw new Error('Method not implemented.');
  }
  
  private jsonURL="/ciudades.json";

  constructor(private http: HttpClient) { }

  getCiudades():Observable<any>{
    return this.http.get<any>(this.jsonURL);
  }
}