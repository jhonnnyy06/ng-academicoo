import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = ConfigurationData.SECURITY_MS_URL;
  tk: string = "";
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    this.tk = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.url}/usuarios`);
  }

  SearchRecord(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/usuarios/${id}`);
  }

  SaveRecord(data: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.url}/usuarios`,
      {
        nombre: data.nombre,
        correo: data.correo,
        celular: data.celular,
        clave: data.clave,
        id_rol: data.id_rol,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }

  EditRecord(data: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.url}/usuarios/${data._id}`,
      {
        nombre: data.nombre,
        correo: data.correo,
        celular: data.celular,
        id_rol: data.id_rol,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }


  RemoveRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/usuarios/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      });
  }
}
