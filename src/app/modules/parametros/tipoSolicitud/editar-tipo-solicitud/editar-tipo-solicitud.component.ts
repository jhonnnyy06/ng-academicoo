import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { TipoSolictudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { UploadedFile } from 'src/app/models/parametros/uploaded.file.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
declare const ShowGeneralMessage: any;
@Component({
  selector: 'app-editar-tipo-solicitud',
  templateUrl: './editar-tipo-solicitud.component.html',
  styleUrls: ['./editar-tipo-solicitud.component.css'],
})
export class EditarTipoSolicitudComponent implements OnInit {
  uploadedFormat: boolean = false;
  dataForm: FormGroup = new FormGroup({});
  mainFormat: FormGroup = new FormGroup({});
  uploadedFilename?: string = '';
  url_server: string = ConfigurationData.BUSSINESS_MS_URL;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.SearchRecord();
  }
  FormBuilding() {
    this.dataForm = this.fb.group({
      // campos formcontrolname
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    this.service.SearchRecord(id).subscribe({
      next: (data: TipoSolictudModel) => {
        this.GetDF['id'].setValue(data.id);
        this.GetDF['nombre'].setValue(data.nombre);
        this.GetDF['formato'].setValue(data.formato);
      },
    });
  }
  SaveRecord() {
    let model = new TipoSolictudModel();
    model.nombre = this.GetDF['nombre'].value;
    model.formato = this.GetDF['formato'].value;
    model.id = this.GetDF['id'].value;
    console.log(model.nombre);
    this.service.EditRecord(model).subscribe({
      next: (data: TipoSolictudModel) => {
        console.log('Guardando', data);
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-tipoSolicitud']);
      },
    });
  }
  get GetDF() {
    return this.dataForm.controls;
  }
  UploadFormat(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.mainFormat.controls['file'].setValue(file);
    }
  }

  SubmitFileToServer() {
    const form = new FormData();
    form.append('file', this.mainFormat.controls['file'].value);
    this.service.UploadMainFormat(form).subscribe({
      next: (data: UploadedFile) => {
        console.log('cargar enviar', data);
        this.dataForm.controls['formato'].setValue(data.filename);
        this.uploadedFormat = true;
        this.uploadedFilename = data.filename;
      },
    });
  }
}
