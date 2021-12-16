import { Component, OnInit } from '@angular/core';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';

@Component({
  selector: 'app-listar-recordatorio',
  templateUrl: './listar-recordatorio.component.html',
  styleUrls: ['./listar-recordatorio.component.css'],
})
export class ListarRecordatorioComponent implements OnInit {
  recordList: RecordatorioModel[] = [];
  constructor(private service: RecordatorioService) {}

  ngOnInit(): void {
    this.ShowRecordList();
  }

  ShowRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: RecordatorioModel[]) => {
        this.recordList = data;
      },
    });
  }
}
