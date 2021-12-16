import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { LocalStorageService } from '../shared/local-storage.service';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { UploadedFile } from 'src/app/models/parametros/uploaded.file.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  filter: string = `?filter={"include":[{"relation": "modalidad"},{"relation": "asociado"},{"relation": "areaInvestigacion"}, {"relation": "tipoSolicitud"}]}`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.tk = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(
      `${this.url}/solicitudes${this.filter}`
    );
  }

  SearchRecord(id: number): Observable<SolicitudModel> { 
    return this.http.get<SolicitudModel>(`${this.url}/solicitudes/${id}`);
  }

  SaveRecord(data: SolicitudModel): Observable<SolicitudModel> {
    return this.http.post<SolicitudModel>(
      `${this.url}/solicitudes`,
      {
        fechaRadicacion: data.fechaRadicacion,
        nombreTrabajo: data.nombreTrabajo,
        archivo: data.archivo,
        descripcion: data.descripcion,
        estado: data.estado,
        id_proponente: data.id_proponente,
        id_area_investigacion: data.id_area_investigacion,
        id_tipo_solicitud: data.id_tipo_solicitud,
        id_modalidad: data.id_modalidad,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  EditRecord(data: SolicitudModel): Observable<SolicitudModel> {
    return this.http.put<SolicitudModel>(
      `${this.url}/solicitudes/${data.id}`,
      {
        fechaRadicacion: data.fechaRadicacion,
        nombreTrabajo: data.nombreTrabajo,
        archivo: data.archivo,
        descripcion: data.descripcion,
        estado: data.estado,
        id_proponente: data.id_proponente,
        id_area_investigacion: data.id_area_investigacion,
        id_tipo_solicitud: data.id_tipo_solicitud,
        id_modalidad: data.modalidad,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/solicitudes/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`,
      }),
    });
  }

  UploadMainRequest(form: FormData): Observable<UploadedFile> {
    return this.http.post<UploadedFile>(
      `${this.url}/CargarDocumentoSolicitud`,
      form,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }
}
