import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationData } from 'src/app/config/configurationData';
import { LocalStorageService } from '../shared/local-storage.service';
import { Observable } from 'rxjs';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';

@Injectable({
  providedIn: 'root',
})
export class RecordatorioService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.tk = this.localStorageService.GetToken();
  }
  GetRecordList(): Observable<RecordatorioModel[]> {
    return this.http.get<RecordatorioModel[]>(`${this.url}/recordatorios`);
  }

  SearchRecord(id: number): Observable<RecordatorioModel> {
    return this.http.get<RecordatorioModel>(`${this.url}/recordatorios/${id}`);
  }

  SaveRecord(data: RecordatorioModel): Observable<RecordatorioModel> {
    return this.http.post<RecordatorioModel>(
      `${this.url}/recordatorios`,
      {
        hora: data.hora,
        fecha: data.fecha,
        resumen: data.resumen,
        id_solicitud: data.id_solicitud,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  EditRecord(data: RecordatorioModel): Observable<RecordatorioModel> {
    return this.http.put<RecordatorioModel>(
      `${this.url}/recordatorios/${data.id}`,
      {
        hora: data.hora,
        fecha: data.fecha,
        resumen: data.resumen,
        id_solicitud: data.id_solicitud,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/recordatorios/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`,
      }),
    });
  }
}
