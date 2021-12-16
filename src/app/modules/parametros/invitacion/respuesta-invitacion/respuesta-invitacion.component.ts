import { Moment } from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { RespuestaInvitacionModel } from 'src/app/models/parametros/respuestaInvitacion.model';
import { EvaluacionSolicitudService } from 'src/app/services/invitacion/evaluacion-solicitud.service';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';
import { UsuarioService } from 'src/app/services/seguridad/usuario.service';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import * as moment from 'moment';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;

@Component({
  selector: 'app-respuesta-invitacion',
  templateUrl: './respuesta-invitacion.component.html',
  styleUrls: ['./respuesta-invitacion.component.css'],
})
export class RespuestaInvitacionComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  respuestaInvitacionList: RespuestaInvitacionModel[] = [];
  constructor(
    private fb: FormBuilder,
    private service: EvaluacionSolicitudService,
    private service2: UsuarioService,
    private service3: JuradoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.SearchRecord();
    setTimeout(() => {
      InitSelect('respuesta');
    }, 100);
  }
  FormBuilding() {
    this.dataForm = this.fb.group({
      id: ['', [Validators.required]],
      respuesta: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      id_jurado: ['', [Validators.required]],
      id_solicitud: ['', [Validators.required]],
    });
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    console.log('Buscando id', id);
    this.service.SearchRecord(id).subscribe({
      next: (data: evaluacionSolicitudModel) => {
        this.GetDF['id'].setValue(data.id);
        this.GetDF['observaciones'].setValue(data.observaciones);
        this.GetDF['id_jurado'].setValue(data.id_jurado);
        this.GetDF['id_solicitud'].setValue(data.id_solicitud);
        this.GetDF['respuesta'].setValue(data.respuesta);
      },
    });
  }
  SaveRecord() {
    let model = new evaluacionSolicitudModel();
    model.id_jurado = Number(this.GetDF['id_jurado'].value);
    model.id_solicitud = Number(this.GetDF['id_solicitud'].value);
    model.observaciones = this.GetDF['observaciones'].value;
    model.id = this.GetDF['id'].value;
    model.respuesta = Number(this.GetDF['respuesta'].value);
    //model.fecha_respuesta = moment().format('MMMM D YYYY, h:mm:ss a').toString()
    console.log(model.fecha_respuesta);
    
    if(model.respuesta = 3){
      
      let user = new UsuarioModel();
      this.service3.SearchRecord(this.GetDF['id_jurado'].value).subscribe({
        next: (data: JuradoModel) => {
          user.nombre = data.nombreCompleto;
          user.correo = data.correo;
          user.celular = data.celular;
          user.clave = "61b13b65";
          user.id_rol = "61b13b651a49eb04845cb329";
          console.log(user)
          this.service2.SaveRecord(user).subscribe({
            next: (data2: UsuarioModel) => {
              console.log('Usuario Jurado Creado');
            }
            });
        },
      });
      this.service.RequestResponse(model).subscribe({
        next: (data: RespuestaInvitacionModel) => {
          ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        },
      });

    }else{
      this.service.RequestResponse(model).subscribe({
        next: (data: RespuestaInvitacionModel) => {
          ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        },
        });
    }
    
  }

  get GetDF() {
    return this.dataForm.controls;
  }
}
