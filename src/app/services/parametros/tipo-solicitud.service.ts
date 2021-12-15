import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { TipoSolictudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { UploadedFile } from 'src/app/models/parametros/uploaded.file.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TipoSolicitudService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.tk = this.localStorage.GetToken();
  }
  GetRecordList(): Observable<TipoSolictudModel[]> {
    return this.http.get<TipoSolictudModel[]>(`${this.url}/tipo-solicitudes`);
  }

  SearchRecord(id: number): Observable<TipoSolictudModel> {
    return this.http.get<TipoSolictudModel>(
      `${this.url}/tipo-solicitudes/${id}`
    );
  }

  SavedRecord(data: TipoSolictudModel): Observable<TipoSolictudModel> {
    return this.http.post<TipoSolictudModel>(
      `${this.url}/tipo-solicitudes`,
      {
        nombre: data.nombre,
        formato: data.formato,
      },
      {
        headers: new HttpHeaders({
          Authorization: `${this.tk}`,
        }),
      }
    );
  }

  EditRecord(data: TipoSolictudModel): Observable<TipoSolictudModel> {
    return this.http.put<TipoSolictudModel>(
      `${this.url}/tipo-solicitudes/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        formato: data.formato,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/tipo-solicitudes/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`,
      }),
    });
  }
  UploadMainFormat(form: FormData): Observable<UploadedFile> {
    return this.http.post<UploadedFile>(
      `${this.url}/CargarFormatoSolicitud`,
      form,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }
}