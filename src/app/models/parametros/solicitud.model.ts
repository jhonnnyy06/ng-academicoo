import { AreaInvestigacionModel } from './areaInvestigacion.model';
import { ModalidadModel } from './modalidad.model';
import { ProponenteModel } from './proponente.model';
import { TipoSolictudModel } from './tipoSolicitud.model';

export class SolicitudModel {
  id?: number;
  fechaRadicacion?: string;
  nombreTrabajo?: string;
  archivo?: string;
  descripcion?: string;
  estado?: number;
  id_modalidad?: number;
  modalidad?: ModalidadModel;
  id_tipo_solicitud?: number;
  tipoSolicitud?: TipoSolictudModel;
  id_area_investigacion?: number;
  areaInvestigacion?: AreaInvestigacionModel;
  asociado?: ProponenteModel;
  id_proponente?: number;
}
