import { Component, OnInit } from '@angular/core';
import { ConfigurationData } from 'src/app/config/configurationData';
import { TipoSolictudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';

@Component({
  selector: 'app-listar-tipo-solicitud',
  templateUrl: './listar-tipo-solicitud.component.html',
  styleUrls: ['./listar-tipo-solicitud.component.css'],
})
export class ListarTipoSolicitudComponent implements OnInit {
  p: number = 1;
  pageSize: number = ConfigurationData.PAGE_SIZE_PAGINATION;
  totalAmount: number = 0;
  recordList: TipoSolictudModel[] = [];

  constructor(private service: TipoSolicitudService) {}

  ngOnInit(): void {
    this.ShowRecordList();
  }

  ShowRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: TipoSolictudModel[]) => {
        this.recordList = data;
      },
    });
  }
}
