import { JuradoModel } from './jurado.model';
import { SolicitudModel } from './solicitud.model';

export class invitacionModel {
  id_jurado?: number;
  id_solicitud?: number;
  evalua?: SolicitudModel;
  corresponde_a?: JuradoModel;
}
