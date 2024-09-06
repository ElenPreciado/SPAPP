import { Component } from '@angular/core';
import {UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoUsuarioService } from 'src/app/servicios/tipo-usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
 usuario: any;
  tipo: any;
  id_usuario: any;
  

  obj_usuario= {
   
    usuario: "",
    contrasena: "",
    fo_tipo_usuario:""
  }


  validar_usuario= true;
  validar_contrasena = true;
  validar_tipo = true;
  mform = false;
  botones_form = false;

  constructor(private susuario: UsuarioService, private stipo: TipoUsuarioService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_t();
  }

  consulta() {
    this.susuario.consultar().subscribe((resultado: any) => {
      this.usuario = resultado;
    })

  }


  consulta_t() {
    this.stipo.consultar().subscribe((resultado: any) => {
      this.tipo = resultado;
      console.log(this.tipo)
    })

  }


  mostrar_form(dato: any) {
    switch (dato) {
      case "show":
        this.mform = true;
        break;

      case "no show":
        this.mform = false;
        this.botones_form =false;
        break;

    }
  }


  limpiar(){
    this.obj_usuario = {
      usuario: "",
      contrasena: "",
      fo_tipo_usuario:""
    }
  
  }

  validar(funcion:any) {



    if (this.obj_usuario.usuario== "") {
      this.validar_usuario =false;
    } else {
      this.validar_usuario = true;
    }

    if (this.obj_usuario.contrasena== "") {
      this.validar_contrasena =false;
    } else {
      this.validar_contrasena = true;
    }


    if (this.obj_usuario.fo_tipo_usuario == "") {
      this.validar_tipo = false;
    } else {
      this.validar_tipo = true;
    }



   

    if (this.validar_usuario==true && this.validar_contrasena==true && this.validar_tipo  && funcion== 'guardar') 
      {
      this.guardar();
    } 


    if (this.validar_usuario==true && this.validar_contrasena==true && this.validar_tipo  && funcion== 'editar') 
      {
      this.editar();
    } 







  }

  guardar() {
this.susuario.insertar(this.obj_usuario).subscribe((datos:any) => {
  if(datos['resultado']== 'OK') {
    this.consulta();
  }
})

this.limpiar();
this.mostrar_form('no show');


  }

  eliminar(id:number) {
   
   
    Swal.fire({
      title: "¿Está seguro de eliminar el usuario?",
      text: "No podrá revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        
this.susuario.eliminar(id).subscribe((datos:any)=> {
  if(datos['resultado']=='OK'){
    this.consulta();
  }
})

        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
      }
    });

  }


  cargar_datos(items:any, id:number){
this.obj_usuario = {
    
  usuario: items.usuario,
  contrasena: items.contrasena,
fo_tipo_usuario: items.tipo
}


this.id_usuario=id;
 this.botones_form=true;
    this.mostrar_form('show');
  }

  editar() {
    this.susuario.editar(this.id_usuario, this.obj_usuario).subscribe((datos:any)=> {
      if (datos['resultado']=='OK') {
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no show');
  }


}

