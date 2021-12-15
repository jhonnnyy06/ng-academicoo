import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInvitacionComponent } from './listar-invitacion.component';

describe('ListarInvitacionComponent', () => {
  let component: ListarInvitacionComponent;
  let fixture: ComponentFixture<ListarInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
