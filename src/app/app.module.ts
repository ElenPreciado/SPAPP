import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { ServiciosComponent } from './modulos/servicios/servicios.component';
import { CitasComponent } from './modulos/citas/citas.component';
import { CategoriaServicioComponent } from './modulos/categoria-servicio/categoria-servicio.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { TipoUsuarioComponent } from './modulos/tipo-usuario/tipo-usuario.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    ClienteComponent,
    ServiciosComponent,
    CitasComponent,
    CategoriaServicioComponent,
    UsuarioComponent,
    TipoUsuarioComponent,
    LoginComponent,
    NoEncontroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
