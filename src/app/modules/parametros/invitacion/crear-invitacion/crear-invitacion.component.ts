import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { invitacionModel } from 'src/app/models/parametros/invitacion.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { EvaluacionSolicitudService } from 'src/app/services/invitacion/evaluacion-solicitud.service';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-crear-invitacion',
  templateUrl: './crear-invitacion.component.html',
  styleUrls: ['./crear-invitacion.component.css'],
})
export class CrearInvitacionComponent implements OnInit {
  juradoList: JuradoModel[] = [];
  solicitudList: SolicitudModel[] = [];
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private evaluacionSolicitudService: EvaluacionSolicitudService,
    private solicitudService: SolicitudService,
    private juradoService: JuradoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.GetDataForSelects();
    setTimeout(() => {
      InitSelect('estado');
    }, 100);
  }
  GetDataForSelects() {
    this.juradoService.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
        this.juradoList = data;
        setTimeout(() => {
          InitSelect('selJurado');
        }, 100);
      },
    });
    this.solicitudService.GetRecordList().subscribe({
      next: (data: SolicitudModel[]) => {
        this.solicitudList = data;
        setTimeout(() => {
          InitSelect('selSolicitud');
        }, 100);
      },
    });
  }
  FormBuilding() {
    this.dataForm = this.fb.group({
      id_jurado: ['', [Validators.required]],
      id_solicitud: ['', [Validators.required]],
    });
  }
  SaveRecord() {
    let model = new invitacionModel();
    model.id_solicitud = Number(this.GetDF['id_solicitud'].value);
    model.id_jurado = Number(this.GetDF['id_jurado'].value);
    this.evaluacionSolicitudService.SaveRecord(model).subscribe({
      next: (data: invitacionModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-invitacion']);
      },
    });
  }
  get GetDF() {
    return this.dataForm.controls;
  }
}
