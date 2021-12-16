import { Component, OnInit } from '@angular/core';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultadoEvaluacion.model';
import { ResultadoEvaluacionService } from 'src/app/services/invitacion/resultado-evaluacion.service';
import { EvaluacionSolicitudService } from 'src/app/services/invitacion/evaluacion-solicitud.service';
import { evaluacionSolicitudModel } from 'src/app/models/parametros/evaluacionSolicitud.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';

@Component({
  selector: 'app-listar-resultado-evaluacion',
  templateUrl: './listar-resultado-evaluacion.component.html',
  styleUrls: ['./listar-resultado-evaluacion.component.css']
})
export class ListarResultadoEvaluacionComponent implements OnInit {
  totalAmount: number = 0;
  recordList: Array<Array<String>> = [];
  id: String = ""
  nombre: String = ""
	descripcion: String = ""
	resultado: String = "0"

  constructor(
    private service: ResultadoEvaluacionService,
    private service2: EvaluacionSolicitudService,
    private service3: JuradoService,
    private service4: SolicitudService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.ShowRecordList();
  }

  ShowRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: ResultadoEvaluacionModel[]) => {

        //buscar evaluacionsolicitud
        if(data[0].id_evaluacionSolicitud){
          this.service2.SearchRecord(data[0].id_evaluacionSolicitud).subscribe({
          next: (data1: evaluacionSolicitudModel) => {

            //verificar jurado
            if(data1.id_jurado){
              this.service3.SearchRecord(data1.id_jurado).subscribe({
                next: (data2: JuradoModel) => {
                  if(data2.correo&&this.localStorageService.GetCorreo() && data2.correo==this.localStorageService.GetCorreo()){
                    
                    //buscar solicitudes asociadas
                    if(data1.id_solicitud){
                      this.service4.SearchRecord(data1.id_solicitud).subscribe({
                        next: (data3: SolicitudModel) => {
                          if(data3.nombreTrabajo&&data3.descripcion){
                            this.nombre=data3.nombreTrabajo
                            this.descripcion=data3.descripcion
                            this.id = String(data[0].id)
                            if(data[0].respuesta != undefined){
                              this.resultado = String(data[0].respuesta)
                            }
                            this.recordList.splice(1, 0, [this.id, this.nombre, this.descripcion, this.resultado]);
                            console.log(this.recordList);
                          }
                          
                        },
                      });
                    }
                  }
                },
              });
            }
              

          },
        })
        }
        
      },
    });
  }

  jurado(id_jurado: number): boolean{
    let jurado = false
    this.service3.SearchRecord(id_jurado).subscribe({
      next: (data2: JuradoModel) => {
        if(data2.correo&&this.localStorageService.GetCorreo()){
          if(data2.correo&&this.localStorageService.GetCorreo()){
              jurado = true
              console.log(jurado);
              
          }
        }
      },
    });
    return jurado
  }
}

