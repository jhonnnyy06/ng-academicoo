import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { RolModel } from 'src/app/models/seguridad/rol.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = ConfigurationData.SECURITY_MS_URL;
  tk: string = "";
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    this.tk = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(`${this.url}/roles`);
  }

  SearchRecord(id: string): Observable<RolModel> {
    return this.http.get<RolModel>(`${this.url}/roles/${id}`);
  }

  SaveRecord(data: RolModel): Observable<RolModel> {
    return this.http.post<RolModel>(`${this.url}/roles`,
      {
        _id: data._id,
        nombre: data.nombre,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }

  EditRecord(data: RolModel): Observable<RolModel> {
    return this.http.put<RolModel>(`${this.url}/roles/${data._id}`,
      {
        _id: data._id,
        nombre: data.nombre,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }


  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/roles/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }
}
