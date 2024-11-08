import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilUsuarioComponent } from './perfil/perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: '',component: LoginComponent}, 
    {path: 'login',component: LoginComponent},
    {path: 'perfil-usuario', component: PerfilUsuarioComponent},
    {path:'menu', component: MenuComponent}
    
];
