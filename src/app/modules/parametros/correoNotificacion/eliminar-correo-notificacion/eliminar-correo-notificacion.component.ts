import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correoNotificacion.model';
import { CorreoNotificacionService } from 'src/app/services/parametros/correo-notificacion.service';
declare const ShowGeneralMessage: any;
@Component({
  selector: 'app-eliminar-correo-notificacion',
  templateUrl: './eliminar-correo-notificacion.component.html',
  styleUrls: ['./eliminar-correo-notificacion.component.css'],
})
export class EliminarCorreoNotificacionComponent implements OnInit {
  id: number = 0;
  correo: string = '';
  constructor(
    private router: Router,
    private service: CorreoNotificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    this.service.SearchRecord(id).subscribe({
      next: (data: CorreoNotificacionModel) => {
        console.log('buscar para eliminar ', data.id, data.estado, data.correo);
        if (data.id && data.correo) {
          this.id = data.id;
          this.correo = data.correo;
        }
      },
    });
  }
  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: any) => {
        ShowGeneralMessage(ConfigurationData.REMOVED_MESSAGE);
        this.router.navigate(['/parametros/listar-correoNotificacion']);
      },
    });
  }
}
