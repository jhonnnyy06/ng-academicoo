import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationData } from 'src/app/config/configurationData';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent implements OnInit {
  id: number = 0;
  nombreTrabajo: string = '';
  descripcion: string = "";
  constructor(
    private router: Router,
    private service: SolicitudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    id = parseFloat(id)
    console.log(typeof id);
    
    
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudModel) => {
        if (data.id && data.nombreTrabajo && data.descripcion) {
          this.id = data.id;
          this.nombreTrabajo = data.nombreTrabajo;
          this.descripcion = data.descripcion;
        }
      },
    });
  }
  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: any) => {
        ShowGeneralMessage(ConfigurationData.REMOVED_MESSAGE);
        this.router.navigate(['/parametros/listar-solicitud']);
      },
    });
  }

}
