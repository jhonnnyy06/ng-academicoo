import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipoVinculacion.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-crear-proponente',
  templateUrl: './crear-proponente.component.html',
  styleUrls: ['./crear-proponente.component.css'],
})
export class CrearProponenteComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  vinculacionList: TipoVinculacionModel[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ProponenteService,
    private vinculacionService: TipoVinculacionService
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.GetDataForSelects();
  }
  FormBuilding() {
    this.dataForm = this.fb.group({
      primerNombre: ['', [Validators.required]],
      otrosNombres: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      vinculacionId: ['', [Validators.required]],
    });
  }

  get GetDF() {
    return this.dataForm.controls;
  }
  SaveRecord() {
    let model = new ProponenteModel();
    model.primerNombre = this.GetDF['primerNombre'].value;
    model.otrosNombres = this.GetDF['otrosNombres'].value;
    model.primerApellido = this.GetDF['primerApellido'].value;
    model.segundoApellido = this.GetDF['segundoApellido'].value;
    model.celular = this.GetDF['celular'].value;
    model.correo = this.GetDF['correo'].value;
    model.documento = this.GetDF['documento'].value;
    model.id_tipo_vinculacion = Number(this.GetDF['vinculacionId'].value);

    this.service.SaveRecord(model).subscribe({
      next: (data: ProponenteModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-proponente']);
      },
    });
  }
  GetDataForSelects() {
    this.vinculacionService.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) => {
        this.vinculacionList = data;
        setTimeout(() => {
          InitSelect('selTipoVinculacion');
        }, 100);
      },
    });
  }
}
