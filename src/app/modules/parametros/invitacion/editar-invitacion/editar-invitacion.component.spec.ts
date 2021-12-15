import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInvitacionComponent } from './editar-invitacion.component';

describe('EditarInvitacionComponent', () => {
  let component: EditarInvitacionComponent;
  let fixture: ComponentFixture<EditarInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
