import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correoNotificacion.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CorreoNotificacionService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.tk = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<CorreoNotificacionModel[]> {
    return this.http.get<CorreoNotificacionModel[]>(
      `${this.url}/correo-notificaciones`
    );
  }
  SearchRecord(id: NumberConstructor): Observable<CorreoNotificacionModel> {
    return this.http.get<CorreoNotificacionModel>(
      `${this.url}/correo-notificaciones/${id}`
    );
  }

  SaveRecord(
    data: CorreoNotificacionModel
  ): Observable<CorreoNotificacionModel> {
    return this.http.post<CorreoNotificacionModel>(
      `${this.url}/correo-notificaciones`,
      {
        correo: data.correo,
        estado: data.estado,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  EditRecord(
    data: CorreoNotificacionModel
  ): Observable<CorreoNotificacionModel> {
    return this.http.put<CorreoNotificacionModel>(
      `${this.url}/correo-notificaciones/${data.id}`,
      {
        correo: data.correo,
        estado: data.estado,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/correo-notificaciones/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`,
      }),
    });
  }
}
