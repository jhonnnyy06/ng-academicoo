import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationData } from 'src/app/config/configurationData';
import { CambioClaveModel } from 'src/app/models/seguridad/cambio-clave.model';
import { SeguridadService } from 'src/app/services/shared/seguridad.service';
import { MD5 } from 'crypto-js';
import { SessionDataModel } from 'src/app/models/seguridad/session-data.model';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { Router } from '@angular/router';

declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private securityService: SeguridadService,
    private localStorageService: LocalStorageService,
    private rooter: Router
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
  }
  //construir formulario
  FormBuilding() {
    this.dataForm = this.fb.group({
      passwordAct: [
        '',
        [
          Validators.required,
          Validators.minLength(ConfigurationData.PASSWORD_MIN_LENGHT),
        ],
      ],
      passwordNew: [
        '',
        [
          Validators.required,
          Validators.minLength(ConfigurationData.PASSWORD_MIN_LENGHT),
        ],
      ],
    });
  }
  Cambiar() {
    if (this.dataForm.invalid) {
      ShowGeneralMessage(ConfigurationData.INVALID_FORM_MESSAGE);
    } else {
      // enviar datos capturados al backend
      //ShowGeneralMessage(ConfigurationData.VALID_FORM_MESSAGE);
      let credential = new CambioClaveModel();
      
      credential.id = this.localStorageService.GetId();
      credential.clave_actual = credential.clave_actual = MD5(this.GetDF['passwordAct'].value).toString();
      credential.nueva_clave = credential.nueva_clave = MD5(this.GetDF['passwordNew'].value).toString();

      console.log('Id', credential.id);
      this.securityService.CambioClave(credential).subscribe({
        next: (data: CambioClaveModel) => {
          ShowGeneralMessage(ConfigurationData.CAMBIO_MESSAGE);
          this.rooter.navigate(['/home']);
        },
      });
    }
  }

  get GetDF() {
    return this.dataForm.controls;
  }
}

