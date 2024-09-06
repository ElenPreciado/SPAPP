import { Component } from '@angular/core';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { CategoriaServicioService } from 'src/app/servicios/categoria-servicio.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';




@Component({
  selector: 'app-cliente',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  servicio: any;
  categoria: any;
  usuario: any;
  id_servicio: any;
  

  obj_servicios = {

    nombre: "",
    descripcion: "",
    duracion: 0,
    precio: 0,
    fo_usuario: "",
    fo_categoria: ""
  }


  validar_nombre = true;
  validar_descripcion = true;
  validar_duracion = true;
  validar_precio = true;
  validar_usuario = true;
  validar_categoria = true;
  mform = false;
  botones_form = false;

  constructor(private sservicio: ServiciosService, private scategoria: CategoriaServicioService, private susuario: UsuarioService) { }

  ngOnInit(): void {
     this.consulta_cs();
    this.consulta_u();
    this.consulta();
   
  }

  consulta() {
    this.sservicio.consultar().subscribe((resultado: any) => {
      this.servicio = resultado;
    
    })

  }


  consulta_cs() {
    this.scategoria.consultar().subscribe((resultado: any) => {
      this.categoria = resultado;
     
      console.log('Categorías recibidas:', this.categoria);
    })

  }


  consulta_u() {
    this.susuario.consultar().subscribe((resultado: any) => {
      this.usuario = resultado;
      console.log(this.usuario)
  
    })

  }


  mostrar_form(dato: any) {
    switch (dato) {
      case "show":
        this.mform = true;
        break;

      case "no show":
        this.mform = false;
        this.botones_form = false;
        break;

    }
  }


  limpiar() {
    this.obj_servicios = {
      nombre: "",
      descripcion: "",
      duracion: 0,
      precio: 0,
      fo_usuario: "",
      fo_categoria: ""
    }

  }

  validar(funcion: any) {



    if (this.obj_servicios.nombre == "") {
      this.validar_nombre = false;
    } else {
      this.validar_nombre = true;
    }

    if (this.obj_servicios.descripcion == "") {
      this.validar_descripcion = false;
    } else {
      this.validar_descripcion = true;
    }


    if (this.obj_servicios.duracion == 0) {
      this.validar_duracion = false;
    } else {
      this.validar_duracion = true;
    }

    if (this.obj_servicios.precio == 0) {
      this.validar_precio = false;
    } else {
      this.validar_precio = true;
    }


    if (this.obj_servicios.fo_usuario == "") {
      this.validar_usuario = false;
    } else {
      this.validar_usuario = true;
    }

    if (this.obj_servicios.fo_categoria == "") {
      this.validar_categoria = false;
    } else {
      this.validar_categoria = true;
    }


    if (this.validar_nombre == true && this.validar_descripcion == true && this.validar_duracion && this.validar_precio == true && this.validar_usuario == true && this.validar_categoria && funcion == 'guardar') {
      this.guardar();
    }


    if (this.validar_nombre == true && this.validar_descripcion == true && this.validar_duracion && this.validar_precio == true && this.validar_usuario == true && this.validar_categoria && funcion == 'editar') {
      this.editar();
    }







  }

  guardar() {
    this.sservicio.insertar(this.obj_servicios).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    })

    this.limpiar();
    this.mostrar_form('no show');


  }

  eliminar(id: number) {


    Swal.fire({
      title: "¿Está seguro de eliminar el servicio?",
      text: "No podrá revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {


        this.sservicio.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado'] == 'OK') {
            this.consulta();
          }
        })

        Swal.fire({
          title: "Eliminado",
          text: "El servicio ha sido eliminado",
          icon: "success"
        });
      }
    });

  }


  cargar_datos(items: any, id: number) {
    this.obj_servicios = {

      nombre: items.nombre,
      descripcion: items.descripcion,
      duracion: items.duracion,
      precio: items.precio,
      fo_usuario: items.fo_usuario,
      fo_categoria: items.fo_categoria
    }


    this.id_servicio = id;
    this.botones_form = true;
    this.mostrar_form('show');
  }

  editar() {
    this.sservicio.editar(this.id_servicio, this.obj_servicios).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no show');
  }


}


