import { UserDataModel } from './user-data.model';

export class SessionDataModel {
  tk?: string;
  usuario?: UserDataModel;
  isLoggedIn: boolean = false;
  isAdminIn: boolean = false; //esta logeado
}
