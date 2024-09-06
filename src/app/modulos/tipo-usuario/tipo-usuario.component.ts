import { Component } from '@angular/core';
import { TipoUsuarioService } from 'src/app/servicios/tipo-usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.scss']
})
export class TipoUsuarioComponent {

  tipo: any;
id_tipo:any;

  obj_tipo= {
   
  nombre: ""
  }


  validar_nombre= true;
  mform = false;
  botones_form = false;

  constructor(private stipo: TipoUsuarioService) { }

  ngOnInit(): void {
    this.consulta();
  
  }

  consulta() {
    this.stipo.consultar().subscribe((resultado: any) => {
      this.tipo = resultado;
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
    this.obj_tipo = {
      nombre:""
    }
  
  }

  validar(funcion:any) {



    if (this.obj_tipo.nombre== "") {
      this.validar_nombre =false;
    } else {
      this.validar_nombre = true;
    }




   

    if (this.validar_nombre==true && funcion== 'guardar') 
      {
      this.guardar();
    } 


    if (this.validar_nombre==true  && funcion== 'editar') 
      {
      this.editar();
    } 







  }

  guardar() {
this.stipo.insertar(this.obj_tipo).subscribe((datos:any) => {
  if(datos['resultado']== 'OK') {
    this.consulta();
  }
})

this.limpiar();
this.mostrar_form('no show');


  }

  eliminar(id:number) {
   
   
    Swal.fire({
      title: "¿Está seguro de eliminar el tipo de usuario?",
      text: "No podrá revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        
this.stipo.eliminar(id).subscribe((datos:any)=> {
  if(datos['resultado']=='OK'){
    this.consulta();
  }
})

        Swal.fire({
          title: "Eliminado",
          text: "El tipo deusuario ha sido eliminado",
          icon: "success"
        });
      }
    });

  }


  cargar_datos(items:any, id:number){
this.obj_tipo = {
    
 nombre: items.nombre
}


this.id_tipo=id;
 this.botones_form=true;
    this.mostrar_form('show');
  }

  editar() {
    this.stipo.editar(this.id_tipo, this.obj_tipo).subscribe((datos:any)=> {
      if (datos['resultado']=='OK') {
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no show');
  }


}

