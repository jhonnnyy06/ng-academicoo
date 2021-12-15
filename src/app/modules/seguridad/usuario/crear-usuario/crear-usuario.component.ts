import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { RolModel } from 'src/app/models/seguridad/rol.model';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';
import { RolService } from 'src/app/services/seguridad/rol.service';
import { UsuarioService } from 'src/app/services/seguridad/usuario.service';

declare const ShowGeneralMessage: any;
declare const InitSelect: any;
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  dataForm: FormGroup = new FormGroup({});
  rolList: RolModel[] = [];
  url_server: string = ConfigurationData.SECURITY_MS_URL;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private RolService: RolService,
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
    this.GetDataForSelects();
  }

  GetDataForSelects() {
    this.RolService.GetRecordList().subscribe({
      next: (data: RolModel[]) => {
        this.rolList = data;
        console.log(data);
        
        setTimeout(() => {
          InitSelect("selRol");
        }, 100);
      }
    });
  }

  FormBuilding() {
    this.dataForm = this.fb.group({
      nombre: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      clave: ["", [Validators.required]],
      rol: ["", [Validators.required]],
    });
  }

  get GetDF() {
    return this.dataForm.controls;
  }

  SaveRecord() {
    let model = new UsuarioModel();
    model.nombre = this.GetDF["nombre"].value;
    model.correo = this.GetDF["correo"].value;
    model.celular = this.GetDF["celular"].value.toString() ;
    model.clave = this.GetDF["celular"].value.toString();
    model.id_rol = this.GetDF["rol"].value;
    console.log(model)
    this.service.SaveRecord(model).subscribe({
      next: (data: UsuarioModel) => {
        ShowGeneralMessage(ConfigurationData.SAVED_MESSAGE)
        this.router.navigate(["/seguridad/listar-usuario"]);
      }
    });
  }

}
