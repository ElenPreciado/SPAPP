import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 usuario: any;
 clave: any; 
 error = false;
 user= {
usuario: "",
clave: "",
tipo_usuario: ""
 }


constructor(private slogin: LoginService, private router: Router) {}


ngOnInit(): void {

}

consulta(tecla: any){
  if(tecla == 13 || tecla == "") {
this.slogin.consultar(this.usuario, this.clave).subscribe((resultado: any)=>{
this.usuario = resultado;
console.log(this.usuario);
})
  }
}


 }
