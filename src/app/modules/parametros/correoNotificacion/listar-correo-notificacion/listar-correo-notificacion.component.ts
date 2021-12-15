import { Component, OnInit } from '@angular/core';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correoNotificacion.model';
import { CorreoNotificacionService } from 'src/app/services/parametros/correo-notificacion.service';
import { ConfigurationData } from 'src/app/config/configurationData';

@Component({
  selector: 'app-listar-correo-notificacion',
  templateUrl: './listar-correo-notificacion.component.html',
  styleUrls: ['./listar-correo-notificacion.component.css'],
})
export class ListarCorreoNotificacionComponent implements OnInit {
  p: number = 1;
  pageSize: number = ConfigurationData.PAGE_SIZE_PAGINATION;
  totalAmount: number = 0;
  recordList: CorreoNotificacionModel[] = [];
  constructor(private service: CorreoNotificacionService) {}

  ngOnInit(): void {
    this.ShowRecordList();
  }
  ShowRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: CorreoNotificacionModel[]) => {
        this.recordList = data;
      },
    });
  }
}
