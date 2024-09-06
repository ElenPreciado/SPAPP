import { Component } from '@angular/core';
import { CategoriaServicioService } from 'src/app/servicios/categoria-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-servicio',
  templateUrl: './categoria-servicio.component.html',
  styleUrls: ['./categoria-servicio.component.scss']
})
export class CategoriaServicioComponent {
  categoria: any;
  id_categoria: any;

  obj_categoria = {

    nombre: ""

  }


  validar_nombre = true;

  mform = false;
  botones_form = false;

  constructor(private scategoria: CategoriaServicioService) { }

  ngOnInit(): void {
    this.consulta();

  }

  consulta() {
    this.scategoria.consultar().subscribe((resultado: any) => {
      this.categoria = resultado;
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
    this.obj_categoria = {

      nombre: ""

    }

  }

  validar(funcion: any) {



    if (this.obj_categoria.nombre == "") {
      this.validar_nombre = false;
    } else {
      this.validar_nombre = true;
    }


    if (this.validar_nombre==true && funcion== 'guardar') 
      {
      this.guardar();
    } 


    if (this.validar_nombre==true && funcion== 'editar') 
      {
      this.editar();
    } 







  }

  guardar() {
    this.scategoria.insertar(this.obj_categoria).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    })

    this.limpiar();
    this.mostrar_form('no show');


  }

  eliminar(id: number) {


    Swal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "No podrá revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {


        this.scategoria.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado'] == 'OK') {
            this.consulta();
          }
        })

        Swal.fire({
          title: "Eliminado",
          text: "La categoria ha sido eliminada",
          icon: "success"
        });
      }
    });

  }


  cargar_datos(items: any, id: number) {
    this.obj_categoria = {

      nombre: items.nombre

    }
    this.id_categoria = id;
    this.botones_form = true;
    this.mostrar_form('show');
  }

  editar() {
    this.scategoria.editar(this.id_categoria, this.obj_categoria).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no show');
  }


}

