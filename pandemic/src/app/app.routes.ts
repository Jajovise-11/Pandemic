import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
    { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
    { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) }

];
