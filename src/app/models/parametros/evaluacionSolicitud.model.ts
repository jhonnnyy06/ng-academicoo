import { JuradoModel } from './jurado.model';
import { SolicitudModel } from './solicitud.model';

export class evaluacionSolicitudModel {
  id?: number;
  id_solicitud?: number;
  id_jurado?: number;
  fecha_invitacion?: string;
  fecha_respuesta?: string;
  observaciones?: string;
  respuesta?: number;
  evalua?: SolicitudModel;
  corresponde_a?: JuradoModel;
}
