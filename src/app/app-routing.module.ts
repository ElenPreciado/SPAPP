import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent} from './estructura/principal.component';
import {DashboardComponent} from './modulos/dashboard/dashboard.component';
import { CitasComponent } from './modulos/citas/citas.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CategoriaServicioComponent} from './modulos/categoria-servicio/categoria-servicio.component';
import { ServiciosComponent } from './modulos/servicios/servicios.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';


const routes: Routes = [
{
  path: '', component: PrincipalComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
     {path: 'citas', component: CitasComponent},
     {path: 'cliente', component: ClienteComponent},
     {path: 'usuario', component: UsuarioComponent},
 
     {path: 'categoria-servicio', component: CategoriaServicioComponent},
     {path: 'servicios', component: ServiciosComponent},
    {path: '', redirectTo: 'dashboard', pathMatch:'full'}
  ]
},

{path:'login', component: LoginComponent},
{path: '**', component: NoEncontroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
