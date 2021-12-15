import { RolModel } from "./rol.model";
export class UsuarioModel {
    _id?: string;
    nombre?: string;
    correo?: string;
    celular?: string;
    clave?: string;
    id_rol?: string;
    rol?: RolModel;

  }