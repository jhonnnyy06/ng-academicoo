import { SolicitudModel } from './solicitud.model';

export class RecordatorioModel {
  id?: number;
  resumen?: string;
  fecha?: string;
  hora?: string;
  id_solicitud?: number;
  evalua?: SolicitudModel;
}
