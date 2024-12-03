import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl='http://localhost/';

  constructor(private http: HttpClient) { }

  register(usuario: Usuario):Observable<any>{
    return this.http.post(this.apiUrl + 'insertarUsuario.php', JSON.stringify(usuario));
  }

  
}
