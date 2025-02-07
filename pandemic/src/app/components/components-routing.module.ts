import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { InformacionComponent } from './informacion/informacion.component';
import { PerfilUsuarioComponent } from '../perfil/perfil-usuario/perfil-usuario.component';
import { CargarPartidaComponent } from './cargar-partida/cargar-partida.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { PartidaComponent } from './partida/partida.component';


const routes: Routes = [

{ path: '', component: LoginComponent },
{ path: 'menu', component: MenuComponent },
{ path: 'informacion', component: InformacionComponent},
{ path: 'perfil', component: PerfilUsuarioComponent},
{ path: 'cargar', component: CargarPartidaComponent},
{ path: 'nueva', component: NuevaPartidaComponent},
{ path: 'partida', component: PartidaComponent},
];


@NgModule({

imports: [RouterModule.forChild(routes)],

exports: [RouterModule]

})

export class ComponentsRoutingModule { }