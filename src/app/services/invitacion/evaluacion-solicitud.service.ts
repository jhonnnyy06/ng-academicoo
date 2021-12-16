import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationData } from 'src/app/config/configurationData';
import { LocalStorageService } from '../shared/local-storage.service';
import { Observable } from 'rxjs';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { invitacionModel } from 'src/app/models/parametros/invitacion.model';
import { RespuestaInvitacionModel } from 'src/app/models/parametros/respuestaInvitacion.model';
@Injectable({
  providedIn: 'root',
})
export class EvaluacionSolicitudService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  filter: string = `?filter={"include":[{"relation": "evalua"},{"relation": "corresponde_a"}]}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.tk = this.localStorageService.GetToken();
  }
  GetRecordList(): Observable<evaluacionSolicitudModel[]> {
    return this.http.get<evaluacionSolicitudModel[]>(
      `${this.url}/evaluacion-solicitudes${this.filter}`
    );
  }
  SearchRecord(id: number): Observable<evaluacionSolicitudModel> {
    return this.http.get<evaluacionSolicitudModel>(
      `${this.url}/evaluacion-solicitudes/${id}`
    );
  }

  SaveRecord(data: invitacionModel): Observable<invitacionModel> {
    return this.http.post<invitacionModel>(
      `${this.url}/evaluacion-solicitudes`,
      {
        id_jurado: data.id_jurado,
        id_solicitud: data.id_solicitud,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RequestResponse(
    data: evaluacionSolicitudModel
  ): Observable<evaluacionSolicitudModel> {
    return this.http.patch<evaluacionSolicitudModel>(
      `${this.url}/aceptar-solicitud/${data.id}`,
      {
        id_jurado: data.id_jurado,
        id_solicitud: data.id_solicitud,
        respuesta: data.respuesta,
        observaciones: data.observaciones,
        //fecha_respuesta: data.fecha_respuesta,

      }
    );
  }

  RequestRecord(
    data: evaluacionSolicitudModel
  ): Observable<evaluacionSolicitudModel> {
    return this.http.patch<evaluacionSolicitudModel>(
      `${this.url}/recordatorio-solicitud/${data.id}`,
      {
        id_jurado: data.id_jurado,
        id_solicitud: data.id_solicitud,
        respuesta: data.respuesta,
        observaciones: data.observaciones,
        //fecha_respuesta: data.fecha_respuesta,

      }
    );
  }
}
