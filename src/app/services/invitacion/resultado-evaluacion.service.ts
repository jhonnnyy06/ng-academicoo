import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationData } from 'src/app/config/configurationData';
import { LocalStorageService } from '../shared/local-storage.service';
import { Observable } from 'rxjs';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultadoEvaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadoEvaluacionService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  tk: string = '';
  filter: string = `?filter={"include":[{"relation": "evalua"},{"relation": "corresponde_a"}]}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.tk = this.localStorageService.GetToken();
    console.log("tokeeeen",this.tk);
    
  }
  GetRecordList(): Observable<ResultadoEvaluacionModel[]> {
    return this.http.get<ResultadoEvaluacionModel[]>(
      `${this.url}/resultado-evaluaciones`,{
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }
  SearchRecord(id: NumberConstructor): Observable<ResultadoEvaluacionModel> {
    return this.http.get<ResultadoEvaluacionModel>(
      `${this.url}/resultado-evaluaciones/${id}`
    );
  }

  SaveRecord(data: ResultadoEvaluacionModel): Observable<ResultadoEvaluacionModel> {
    
    return this.http.post<ResultadoEvaluacionModel>(
      `${this.url}/resultado-evaluaciones`,
      {
        resultado: data.respuesta,   
        formato_diligenciado: data.formato_diligenciado,
        id_evaluacionSolicitud: data.id_evaluacionSolicitud,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  EditRecord(data: ResultadoEvaluacionModel): Observable<ResultadoEvaluacionModel> {
    return this.http.put<ResultadoEvaluacionModel>(
      `${this.url}/resultado-evaluaciones/${data.id}`,
      {
        id_evaluacionSolicitud: data.id_evaluacionSolicitud,
        respuesta: data.respuesta,
        formato_diligenciado: data.formato_diligenciado,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`,
        }),
      }
    );
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/resultado-evaluaciones/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`,
      }),
    });
  }
}
