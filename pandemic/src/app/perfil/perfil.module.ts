import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilUsuarioComponent  },
  { path: 'menu', component: MenuComponent}
];

@NgModule({
  declarations: [PerfilUsuarioComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

  exports: [ 
    PerfilUsuarioComponent,
    MenuComponent
  ]
})
export class PerfilModule { }