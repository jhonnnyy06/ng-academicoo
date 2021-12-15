import { TestBed } from '@angular/core/testing';

import { EvaluacionSolicitudService } from './evaluacion-solicitud.service';

describe('EvaluacionSolicitudService', () => {
  let service: EvaluacionSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
