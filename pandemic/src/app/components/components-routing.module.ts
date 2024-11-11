import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { InformacionComponent } from './informacion/informacion.component';



const routes: Routes = [

{ path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'menu', component: MenuComponent },
{ path: 'informacion', component: InformacionComponent}

];


@NgModule({

imports: [RouterModule.forChild(routes)],

exports: [RouterModule]

})

export class ComponentsRoutingModule { }