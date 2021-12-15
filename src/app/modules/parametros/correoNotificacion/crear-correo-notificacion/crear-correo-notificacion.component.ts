import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correoNotificacion.model';
import { CorreoNotificacionService } from 'src/app/services/parametros/correo-notificacion.service';
declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-crear-correo-notificacion',
  templateUrl: './crear-correo-notificacion.component.html',
  styleUrls: ['./crear-correo-notificacion.component.css'],
})
export class CrearCorreoNotificacionComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private service: CorreoNotificacionService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  FormBuilding() {
    this.dataForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.FormBuilding();
    setTimeout(() => {
      InitSelect('estado');
    }, 100);
  }
  get GetDF() {
    return this.dataForm.controls;
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
    model.estado = this.ValorEstado();

    console.log(this.ValorEstado);
    console.log('modelo', model.estado);
    this.service.SaveRecord(model).subscribe({
      next: (data: CorreoNotificacionModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE);
        this.router.navigate(['/parametros/listar-correoNotificacion']);
      },
    });
  }
}
