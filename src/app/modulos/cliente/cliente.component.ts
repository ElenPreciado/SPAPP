import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  cliente: any;
  ciudad: any;
  id_cliente: any;

  obj_cliente = {
    identificacion: 0,
    nombre: "",
    direccion: "",
    celular: 0,
    email: "",
    fo_ciudad: ""
  }

  validar_identificacion = true;
  validar_nombre = true;
  validar_ciudad = true;
  validar_direccion = true;
  validar_celular = true;
  validar_email = true;
  mform = false;
  botones_form = false;

  constructor(private scliente: ClienteService, private sciudad: CiudadService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_c();
  }

  consulta() {
    this.scliente.consultar().subscribe((resultado: any) => {
      this.cliente = resultado;
    })

  }


  consulta_c() {
    this.sciudad.consultar().subscribe((resultado: any) => {
      this.ciudad = resultado;
      console.log(this.ciudad)
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
    this.obj_cliente = {
      identificacion: 0,
      nombre: "",
      direccion: "",
      celular: 0,
      email: "",
      fo_ciudad: ""
    }
  
  }

  validar(funcion:any) {


    if (this.obj_cliente.identificacion == 0) {
      this.validar_identificacion =false;
    } else {
      this.validar_identificacion = true;
    }


    if (this.obj_cliente.nombre == "") {
      this.validar_nombre =false;
    } else {
      this.validar_nombre = true;
    }


    if (this.obj_cliente.direccion == "") {
      this.validar_direccion = false;
    } else {
      this.validar_direccion = true;
    }

    if (this.obj_cliente.celular == 0) {
      this.validar_celular =false;
    } else {
      this.validar_celular = true;
    }


    if (this.obj_cliente.email == "") {
      this.validar_email =false;
    } else {
      this.validar_email = true;
    }

    if (this.obj_cliente.fo_ciudad == "") {
      this.validar_ciudad = false;
    } else {
      this.validar_ciudad =true;
    }


    if (this.validar_identificacion==true && this.validar_nombre==true && this.validar_direccion && this.validar_celular == true && this.validar_email==true && this.validar_ciudad && funcion== 'guardar') 
      {
      this.guardar();
    } 


    if (this.validar_identificacion==true && this.validar_nombre==true && this.validar_direccion && this.validar_celular == true && this.validar_email==true && this.validar_ciudad && funcion== 'editar') 
      {
      this.editar();
    } 







  }

  guardar() {
this.scliente.insertar(this.obj_cliente).subscribe((datos:any) => {
  if(datos['resultado']== 'OK') {
    this.consulta();
  }
})

this.limpiar();
this.mostrar_form('no show');


  }

  eliminar(id:number) {
   
   
    Swal.fire({
      title: "¿Está seguro de eliminar el cliente?",
      text: "No podrá revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        
this.scliente.eliminar(id).subscribe((datos:any)=> {
  if(datos['resultado']=='OK'){
    this.consulta();
  }
})

        Swal.fire({
          title: "Eliminado",
          text: "El cliente ha sido eliminado",
          icon: "success"
        });
      }
    });

  }


  cargar_datos(items:any, id:number){
this.obj_cliente = {
  identificacion: items.identificacion,
  nombre: items.nombre,
  direccion: items.direccion,
  celular: items.celular,
  email: items.email,
  fo_ciudad:items.fo_ciudad
}


this.id_cliente=id;
 this.botones_form=true;
    this.mostrar_form('show');
  }

  editar() {
    this.scliente.editar(this.id_cliente, this.obj_cliente).subscribe((datos:any)=> {
      if (datos['resultado']=='OK') {
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no show');
  }


}
