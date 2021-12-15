import { Component, OnInit } from '@angular/core';
import { ConfigurationData } from 'src/app/config/configurationData';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { EvaluacionSolicitudService } from 'src/app/services/invitacion/evaluacion-solicitud.service';

@Component({
  selector: 'app-listar-invitacion',
  templateUrl: './listar-invitacion.component.html',
  styleUrls: ['./listar-invitacion.component.css'],
})
export class ListarInvitacionComponent implements OnInit {
  p: number = 1;
  pageSize: number = ConfigurationData.PAGE_SIZE_PAGINATION;
  totalAmount: number = 0;
  recordList: evaluacionSolicitudModel[] = [];
  constructor(private service: EvaluacionSolicitudService) {}

  ngOnInit(): void {
    this.ShowRecordList();
  }

  ShowRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: evaluacionSolicitudModel[]) => {
        this.recordList = data;
      },
    });
  }
}
