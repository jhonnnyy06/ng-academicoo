import { evaluacionSolicitudModel } from './evaluacionSolicitud.model';
export class ResultadoEvaluacionModel {
  id?: number;
  id_evaluacionSolicitud?: number;
  respuesta?: string;
  formato_diligenciado?: string;
  evaluacion?: evaluacionSolicitudModel;
}
