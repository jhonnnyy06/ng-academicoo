import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionDataModel } from 'src/app/models/seguridad/session-data.model';
import { RecuperarDataModel } from 'src/app/models/seguridad/recuperar-data.model';
import { CambioClaveModel } from 'src/app/models/seguridad/cambio-clave.model';
import { ConfigurationData } from '../../config/configurationData';
import { UserCredentialsModel } from '../../models/seguridad/user-credentials.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  sessionInfoSubject: BehaviorSubject<SessionDataModel> =
    new BehaviorSubject<SessionDataModel>(new SessionDataModel());
  url: string = ConfigurationData.SECURITY_MS_URL;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.VerifyActiveSession();
  }

  VerifyActiveSession(): boolean {
    let info = this.localStorageService.GetSessionInfo();
    if (info.tk) {
      console.log(`$Verificar sesion tk ${info.tk}`);
      info.isLoggedIn = true;
      if(this.localStorageService.GetRol()=="618375c0c8871620e0879248"){
        info.isAdminIn=true;
      }
      this.RefreshSessionInfo(info);
      console.log('verificar session activa: ', true);
      console.log('verificar session admin: ', info.isAdminIn);
      return true;
    } else {
      return false;
    }
  }
  RefreshSessionInfo(data: SessionDataModel) {
    this.sessionInfoSubject.next(data);
  }

  GetSessionInfo() {
    return this.sessionInfoSubject.asObservable();
  }
  Login(data: UserCredentialsModel): Observable<SessionDataModel> {
    console.log('servicio seguridad crear usuario data', data);
    return this.http.post<SessionDataModel>(`${this.url}/identificar-usuario`, {
      usuario: data.username,
      clave: data.password,
    });
  }
  RecuperarClave(data: RecuperarDataModel): Observable<RecuperarDataModel> {
    console.log('servicio seguridad recuperar clave', data);
    return this.http.post<RecuperarDataModel>(`${this.url}/recuperar-clave`, {
      correo: data.correo
    });
  }
  CambioClave(data: CambioClaveModel): Observable<CambioClaveModel> {
    console.log('servicio seguridad cambiar clave', data);
    return this.http.post<CambioClaveModel>(`${this.url}/cambiar-clave`, {
      id: data.id,
      clave_actual: data.clave_actual,
      nueva_clave: data.nueva_clave
    });
  }
}
