import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { AreaInvestigacionModel } from 'src/app/models/parametros/areaInvestigacion.model';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { TipoSolictudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { UploadedFile } from 'src/app/models/parametros/uploaded.file.model';
import { AreaInvestigacionService } from 'src/app/services/parametros/area-investigacion.service';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css'],
})
export class CrearSolicitudComponent implements OnInit {
  uploadedPhoto: boolean = false;
  dataForm: FormGroup = new FormGroup({});
  mainRequestForm: FormGroup = new FormGroup({});
  proponenteList: ProponenteModel[] = [];
  tipoSolicitudList: TipoSolictudModel[] = [];
  areaInvestigacionList: AreaInvestigacionModel[] = [];
  modalidadList: ModalidadModel[] = [];

  uploadedFilename?: string = '';
  url_server: string = ConfigurationData.BUSSINESS_MS_URL;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SolicitudService,
    private modalidadService: ModalidadService,
    private tipoSolicitudService: TipoSolicitudService,
    private proponenteService: ProponenteService,
    private areateService: AreaInvestigacionService
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.FormMainPhoto();
    this.GetDataForSelects();
    setTimeout(() => {
      InitSelect('estado');
    }, 100);
  }

  GetDataForSelects() {
    this.modalidadService.GetRecordList().subscribe({
      next: (data: ModalidadModel[]) => {
        this.modalidadList = data;
        setTimeout(() => {
          InitSelect('selModalidad');
        }, 100);
      },
    });
    this.tipoSolicitudService.GetRecordList().subscribe({
      next: (data: TipoSolictudModel[]) => {
        this.tipoSolicitudList = data;
        setTimeout(() => {
          InitSelect('selTipoSolicitud');
        }, 100);
      },
    });
    this.areateService.GetRecordList().subscribe({
      next: (data: AreaInvestigacionModel[]) => {
        this.areaInvestigacionList = data;
        setTimeout(() => {
          InitSelect('selArea');
        }, 100);
      },
    });
    this.proponenteService.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.proponenteList = data;
        setTimeout(() => {
          InitSelect('selProponente');
        }, 100);
      },
    });
  }

  FormMainPhoto() {
    this.mainRequestForm = this.fb.group({
      file: ['', []],
    });
  }

  FormBuilding() {
    this.dataForm = this.fb.group({
      fechaRadicacion: ['', [Validators.required]],
      nombreTrabajo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      id_modalidad: ['', [Validators.required]],
      id_tipo_solicitud: ['', [Validators.required]],
      id_area_investigacion: ['', [Validators.required]],
      id_proponente: ['', [Validators.required]],
    });
  }

  get GetDF() {
    return this.dataForm.controls;
  }

  SaveRecord() {
    let model = new SolicitudModel();
    model.fechaRadicacion = this.GetDF['fechaRadicacion'].value;
    model.archivo = this.GetDF['archivo'].value;
    model.descripcion = this.GetDF['descripcion'].value;
    model.id_modalidad = Number(this.GetDF['id_modalidad'].value);
    console.log('Modalidad ', model.id_modalidad);
    model.id_area_investigacion = Number(
      this.GetDF['id_area_investigacion'].value
    );
    model.estado = 1
    model.id_tipo_solicitud = Number(this.GetDF['id_tipo_solicitud'].value);
    model.id_proponente = Number(this.GetDF['id_proponente'].value);
    model.nombreTrabajo = this.GetDF['nombreTrabajo'].value;
    console.log(model);
    
    this.service.SaveRecord(model).subscribe({
      next: (data: SolicitudModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-solicitud']);
      },
    });
  }

  // Carga de archivo

  UploadRequest(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mainRequestForm.controls['file'].setValue(file);
    }
  }

  SubmitFileToServer() {
    const form = new FormData();
    form.append('file', this.mainRequestForm.controls['file'].value);
    this.service.UploadMainRequest(form).subscribe({
      next: (data: UploadedFile) => {
        this.dataForm.controls['archivo'].setValue(data.filename);
        this.uploadedPhoto = true;
        this.uploadedFilename = data.filename;
      },
    });
  }
}
