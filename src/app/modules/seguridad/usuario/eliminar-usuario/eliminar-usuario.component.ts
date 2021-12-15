import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';
import { UsuarioService } from 'src/app/services/seguridad/usuario.service';

declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  _id: string = "";
  nombre: string = '';
  correo: string = "";
  celular: string = '';
  constructor(
    private router: Router,
    private service: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    this.service.SearchRecord(id).subscribe({
      next: (data: UsuarioModel) => {
        if (data._id && data.nombre && data.correo && data.celular) {
          this._id = data._id;
          this.nombre = data.nombre;
          this.correo = data.correo;
          this.celular = data.celular;
        }
      },
    });
  }
  RemoveRecord() {
    this.service.RemoveRecord(this._id).subscribe({
      next: (data: any) => {
        ShowGeneralMessage(ConfigurationData.REMOVED_MESSAGE);
        this.router.navigate(['/seguridad/listar-usuario']);
      },
    });
  }

}
