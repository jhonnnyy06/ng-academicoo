import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { EvaluacionSolicitudService } from 'src/app/services/invitacion/evaluacion-solicitud.service';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import { RespuestaInvitacionModel } from 'src/app/models/parametros/respuestaInvitacion.model';

declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-editar-invitacion',
  templateUrl: './editar-invitacion.component.html',
  styleUrls: ['./editar-invitacion.component.css']
})
export class EditarInvitacionComponent implements OnInit {

  id: number = 0;
  fecha_invitacion: string = '';
  respuesta: string = '';
  respuesta2: number = 0;
  id_jurado: number = 0;
  id_solicitud: number = 0;
  nombre: string = '';
  celular: string = '';
  correo: string = '';
  constructor(
    private router: Router,
    private service: EvaluacionSolicitudService,
    private service2: EvaluacionSolicitudService,
    private route: ActivatedRoute,
    private service3: JuradoService,
  ) {}

  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    id = parseFloat(id)
    console.log(typeof id);
    
    
    this.service.SearchRecord(id).subscribe({
      next: (data: evaluacionSolicitudModel) => {
        if (data.id && data.fecha_invitacion && data.respuesta && data.id_solicitud) {
          this.id = data.id;
          this.fecha_invitacion = data.fecha_invitacion;
          this.id_solicitud = data.id_solicitud;
          this.respuesta2 = data.respuesta;
          switch(data.respuesta) { 
            case 3: { 
               this.respuesta = "Aceptado";
               break; 
            } 
            case 2: { 
              this.respuesta = "Rechazado" 
               break; 
            } 
            default: { 
              this.respuesta = "Sin respuesta"
               break; 
            } 
         } 
         if(data.id_jurado){
            this.service3.SearchRecord(data.id_jurado).subscribe({
              next: (data: JuradoModel) => {
                if(data.nombreCompleto && data.celular && data.correo && data.id){
                  this.nombre = data.nombreCompleto;
                  this.celular = data.celular;
                  this.correo = data.correo;
                  this.id_jurado = data.id
                }
                  

              },
            });
          }
          
          
        }
      },
    });
  }
  Record() {
    let id = this.route.snapshot.params['id'];
    id = parseFloat(id)
    let model = new evaluacionSolicitudModel();
    model.id_jurado = this.id_jurado;
    model.id_solicitud = this.id_solicitud;
    model.observaciones = "";
    model.id = id;
    model.respuesta = this.respuesta2;

    this.service2.RequestRecord(model).subscribe({
      next: (data: RespuestaInvitacionModel) => {
        ShowGeneralMessage(ConfigurationData.NOTIFICATION_MESSAGE);
      },
    });
    
  }

}
