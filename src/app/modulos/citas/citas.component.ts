import { Component } from '@angular/core';
import { CitasService } from 'src/app/servicios/citas.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {
  cita: any;
  cliente: any;
  servicio: any;
  id_citas:any;

  obj_citas = {
   fecha: Date,
    hora: "",
    fo_cliente: "",
    fo_servicio: ""
  }

  validar_fecha = true;
  validar_hora = true;
  validar_cliente = true;
  validar_servicio = true;
  mform = false;
  botones_form = false;

  constructor(private scita: CitasService, private scliente: ClienteService, private sservicio: ServiciosService) { }


  ngOnInit(): void {
    this.consulta();
    this.consulta_cli();
    this.consulta_s();
  }

  
  consulta() {
    this.scita.consultar().subscribe((resultado: any) => {
      this.cita = resultado;
    })

  }


  consulta_cli() {
    this.scliente.consultar().subscribe((resultado: any) => {
      this.cliente = resultado;
      console.log(this.cliente)
    })

  }

  consulta_s() {
    this.sservicio.consultar().subscribe((resultado: any) => {
      this.servicio = resultado;
      console.log(this.servicio)
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
    this.obj_citas = {
      fecha: Date,
       hora: "",
       fo_cliente: "",
       fo_servicio: ""
     }
   
  
  }

  validar(funcion:any) {


    if (this.obj_citas.fecha == Date) {
      this.validar_fecha =false;
    } else {
      this.validar_fecha = true;
    }


    if (this.obj_citas.hora == "") {
      this.validar_hora =false;
    } else {
      this.validar_hora = true;
    }


    if (this.obj_citas.fo_cliente == "") {
      this.validar_cliente = false;
    } else {
      this.validar_cliente = true;
    }

    if (this.obj_citas.fo_servicio == "") {
      this.validar_servicio =false;
    } else {
      this.validar_servicio = true;
    }



    if (this.validar_fecha==true && this.validar_hora==true && this.validar_cliente && this.validar_servicio== true && funcion== 'guardar') 
      {
      this.guardar();
    } 


    if (this.validar_fecha==true && this.validar_hora==true && this.validar_cliente && this.validar_servicio== true && funcion== 'editar') 
      {
      this.editar();
    } 








  }
  

  guardar() {
    this.scita.insertar(this.obj_citas).subscribe((datos:any) => {
      if(datos['resultado']== 'OK') {
        this.consulta();
      }
    })
    
    this.limpiar();
    this.mostrar_form('no show');
    
    
      }


      eliminar(id:number) {
   
   
        Swal.fire({
          title: "¿Está seguro de eliminar la cita?",
          text: "No podrá revertir el proceso",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
    
            
    this.scita.eliminar(id).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    })
    
            Swal.fire({
              title: "Eliminada",
              text: "La cita ha sido eliminada",
              icon: "success"
            });
          }
        });
    
      }
    
    
      cargar_datos(items:any, id:number){
    this.obj_citas = {
     fecha: items.fecha,
      hora: items.hora,
    fo_cliente: items.fo_cliente,
     fo_servicio: items.fo_servicio
     
    }
    
    
    this.id_citas=id;
     this.botones_form=true;
        this.mostrar_form('show');
      }
    
      editar() {
        this.scita.editar(this.id_citas, this.obj_citas).subscribe((datos:any)=> {
          if (datos['resultado']=='OK') {
            this.consulta();
          }
        });
        this.limpiar();
        this.mostrar_form('no show');
      }
    
    
    }
    

