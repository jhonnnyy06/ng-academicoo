import { Component, OnInit } from '@angular/core';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';
import { RolModel } from 'src/app/models/seguridad/rol.model';
import { UsuarioService } from 'src/app/services/seguridad/usuario.service';
import { RolService } from 'src/app/services/seguridad/rol.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  recordList: UsuarioModel[] = [];
  constructor(
    private service: UsuarioService,
    private serviceRol: RolService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ShowRecordList();
  }

  ShowRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: UsuarioModel[]) => {
        this.recordList = data;
      }
    });
  }

}
