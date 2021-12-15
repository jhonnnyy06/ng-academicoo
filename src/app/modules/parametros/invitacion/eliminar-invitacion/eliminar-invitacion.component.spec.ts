import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInvitacionComponent } from './eliminar-invitacion.component';

describe('EliminarInvitacionComponent', () => {
  let component: EliminarInvitacionComponent;
  let fixture: ComponentFixture<EliminarInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
