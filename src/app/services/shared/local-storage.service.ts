import { Injectable } from '@angular/core';
import { SessionDataModel } from 'src/app/models/seguridad/session-data.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  SaveSessionData(data: SessionDataModel): boolean {
    let currentData = localStorage.getItem('session-info');
    if (currentData) {
      return false;
    } else {
      let sessionDataString = JSON.stringify(data);
      console.log('Session Guardada localStorage', sessionDataString);
      localStorage.setItem('session-info', sessionDataString);
      return true;
    }
  }

  RemoveSessionData(): boolean {
    let currentData = localStorage.getItem('session-info');
    if (currentData) {
      console.log('Session Removida local elimanado');
      localStorage.removeItem('session-info');
      return true;
    } else {
      return false;
    }
  }

  GetToken(): string {
    let currentData = localStorage.getItem('session-info');
    console.log('currendata token', currentData);
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`$Token String :${sessionDataJson.tk}`);
      return sessionDataJson.tk;
    } else {
      return '';
    }
  }
  GetSessionInfo(): SessionDataModel {
    let currentData = localStorage.getItem('session-info');
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`Informacion Session ${sessionDataJson}`);
      return sessionDataJson;
    } else {
      console.log('1');
      return new SessionDataModel();
      // vacio nuevamente
    }
  }
  GetId(): string {
    let currentData = localStorage.getItem('session-info');
    console.log('currendata id', currentData);
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`$Id String :${sessionDataJson.usuario._id}`);
      return sessionDataJson.usuario._id;
    } else {
      return '';
    }
  }

  GetRol(): string {
    let currentData = localStorage.getItem('session-info');
    console.log('currendata rol', currentData);
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`$Rol String :${sessionDataJson.usuario.id_rol}`);
      return sessionDataJson.usuario.id_rol;
    } else {
      return '';
    }
  }

  GetCorreo(): string {
    let currentData = localStorage.getItem('session-info');
    console.log('currendata correo', currentData);
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`$Correo String :${sessionDataJson.usuario.correo}`);
      return sessionDataJson.usuario.correo;
    } else {
      return '';
    }
  }
}
