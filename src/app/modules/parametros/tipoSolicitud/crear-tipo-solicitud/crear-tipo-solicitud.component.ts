import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { TipoSolictudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { UploadedFile } from 'src/app/models/parametros/uploaded.file.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
declare const ShowGeneralMessage: any;
@Component({
  selector: 'app-crear-tipo-solicitud',
  templateUrl: './crear-tipo-solicitud.component.html',
  styleUrls: ['./crear-tipo-solicitud.component.css'],
})
export class CrearTipoSolicitudComponent implements OnInit {
  uploadedFormat: boolean = false;
  dataForm: FormGroup = new FormGroup({});
  mainFormat: FormGroup = new FormGroup({});
  uploadedFilename?: string = '';
  url_server: string = ConfigurationData.BUSSINESS_MS_URL;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.FormMainPhoto();
  }

  FormMainPhoto() {
    this.mainFormat = this.fb.group({
      file: ['', []],
    });
  }

  FormBuilding() {
    this.dataForm = this.fb.group({
      nombre: ['', [Validators.required]],
      formato: ['', [Validators.required]],
    });
  }

  get GetDF() {
    return this.dataForm.controls;
  }

  SaveRecord() {
    let model = new TipoSolictudModel();
    model.nombre = this.GetDF['nombre'].value;
    model.formato = this.GetDF['formato'].value;
    this.service.SavedRecord(model).subscribe({
      next: (data: TipoSolictudModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-tipoSolicitud']);
      },
    });
  }

  // Carga de archivo

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
