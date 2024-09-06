import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/spapp/backend/Controlador/login.php';

  constructor( private http: HttpClient) { }

  consultar(usuario:any, contraseña:any){
    return this.http.get(`${this.url}?usuario=${usuario}&clave=${contraseña}`);
  }
}
