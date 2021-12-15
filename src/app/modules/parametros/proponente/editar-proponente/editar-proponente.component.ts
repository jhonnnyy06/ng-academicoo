import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipoVinculacion.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-editar-proponente',
  templateUrl: './editar-proponente.component.html',
  styleUrls: ['./editar-proponente.component.css'],
})
export class EditarProponenteComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  vinculacionList: TipoVinculacionModel[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ProponenteService,
    private vinculacionService: TipoVinculacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.GetDataForSelects();
    this.SearchRecord();
  }
  FormBuilding() {
    this.dataForm = this.fb.group({
      id: ['', [Validators.required]],
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
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponenteModel) => {
        console.log('id busqeuda', id);
        this.GetDF['id'].setValue(data.id);
        this.GetDF['primerNombre'].setValue(data.primerNombre);
        this.GetDF['otrosNombres'].setValue(data.otrosNombres);
        this.GetDF['primerApellido'].setValue(data.primerApellido);
        this.GetDF['segundoApellido'].setValue(data.segundoApellido);
        this.GetDF['documento'].setValue(data.documento);
        this.GetDF['celular'].setValue(data.celular);
        this.GetDF['correo'].setValue(data.correo);
        this.GetDF['vinculacionId'].setValue(data.id_tipo_vinculacion);
      },
    });
  }
  SaveRecord() {
    let model = new ProponenteModel();
    model.id = this.GetDF['id'].value;
    model.primerNombre = this.GetDF['primerNombre'].value;
    model.otrosNombres = this.GetDF['otrosNombres'].value;
    model.primerApellido = this.GetDF['primerApellido'].value;
    model.segundoApellido = this.GetDF['segundoApellido'].value;
    model.celular = this.GetDF['celular'].value;
    model.correo = this.GetDF['correo'].value;
    model.documento = this.GetDF['documento'].value;
    model.id_tipo_vinculacion = Number(this.GetDF['vinculacionId'].value);
    console.log('Model editado ', model);
    this.service.EditRecord(model).subscribe({
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
