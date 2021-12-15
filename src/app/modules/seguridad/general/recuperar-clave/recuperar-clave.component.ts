import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationData } from 'src/app/config/configurationData';
import { RecuperarDataModel } from 'src/app/models/seguridad/recuperar-data.model';
import { SeguridadService } from 'src/app/services/shared/seguridad.service';
import { MD5 } from 'crypto-js';
import { SessionDataModel } from 'src/app/models/seguridad/session-data.model';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { Router } from '@angular/router';
declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private securityService: SeguridadService,
    private rooter: Router
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
  }
  //construir formulario
  FormBuilding() {
    this.dataForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(ConfigurationData.EMAIL_MIN_LENGHT),
        ],
      ],
    });
  }
  Recuperar() {
    if (this.dataForm.invalid) {
      ShowGeneralMessage(ConfigurationData.INVALID_FORM_MESSAGE);
    } else {
      // enviar datos capturados al backend
      //ShowGeneralMessage(ConfigurationData.VALID_FORM_MESSAGE);
      let credential = new RecuperarDataModel();
      credential.correo = this.GetDF['username'].value;
      console.log('User', credential.correo);
      this.securityService.RecuperarClave(credential).subscribe({
        next: (data: RecuperarDataModel) => {
          ShowGeneralMessage(ConfigurationData.RESET_MESSAGE);
          this.rooter.navigate(['/seguridad/inicio-sesion']);
        },
      });
    }
  }

  get GetDF() {
    return this.dataForm.controls;
  }

}
