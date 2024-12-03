import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   
  constructor(private authService: AuthService){

  }
  
  miFormulario = new FormGroup({                                            
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required])
    });

    enviar(){
      if(this.miFormulario.valid){
        
        const usuario: Usuario={
          nombre: this.miFormulario.value.nombre,
          password: this.miFormulario.value.email
        }

        this.authService.register(usuario).subscribe(
          (response: any) => {
            console.log("Usuario registrado");
          }
        )
        
      }else{
        console.log("Alguno de los datos es incorrecto");
      }
    }
}
