import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaInvitacionComponent } from './respuesta-invitacion.component';

describe('RespuestaInvitacionComponent', () => {
  let component: RespuestaInvitacionComponent;
  let fixture: ComponentFixture<RespuestaInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespuestaInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
