import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correoNotificacion.model';
import { CorreoNotificacionService } from 'src/app/services/parametros/correo-notificacion.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-editar-correo-notificacion',
  templateUrl: './editar-correo-notificacion.component.html',
  styleUrls: ['./editar-correo-notificacion.component.css'],
})
export class EditarCorreoNotificacionComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CorreoNotificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
    this.SearchRecord();
    setTimeout(() => {
      InitSelect('estado');
    }, 100);
  }

  FormBuilding() {
    this.dataForm = this.fb.group({
      // campos formcontrolname
      id: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  get GetDF() {
    return this.dataForm.controls;
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    this.service.SearchRecord(id).subscribe({
      next: (data: CorreoNotificacionModel) => {
        this.GetDF['id'].setValue(data.id);
        this.GetDF['correo'].setValue(data.correo);
        this.GetDF['estado'].setValue(data.estado);
      },
    });
  }
  ValorEstado(): boolean {
    let estado = this.GetDF['estado'].value;
    if (estado == 'true') {
      return true;
    }
    return false;
  }
  SaveRecord() {
    let model = new CorreoNotificacionModel();
    model.correo = this.GetDF['correo'].value;
    model.id = this.GetDF['id'].value;
    model.estado = this.ValorEstado();
    this.service.EditRecord(model).subscribe({
      next: (data: CorreoNotificacionModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-correoNotificacion']);
      },
    });
  }
}
