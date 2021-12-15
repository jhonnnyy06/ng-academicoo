import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionDataModel } from 'src/app/models/seguridad/session-data.model';
import { SeguridadService } from 'src/app/services/shared/seguridad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  activeSession: boolean = false;
  activeSessionRol: boolean = false;
  subscription: Subscription = new Subscription();
  constructor(private securityService: SeguridadService) {}
  ngOnInit(): void {
    this.subscription = this.securityService.GetSessionInfo().subscribe({
      next: (data: SessionDataModel) => {
        this.activeSession = data.isLoggedIn;
        console.log(data.isAdminIn);
        
        this.activeSessionRol = data.isAdminIn;
      },
      error: (err: any) => {},
    });
  }
}
