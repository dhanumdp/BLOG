import { TestBed } from '@angular/core/testing';

import { AlumnipasswordchangeService } from './alumnipasswordchange.service';

describe('AlumnipasswordchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlumnipasswordchangeService = TestBed.get(AlumnipasswordchangeService);
    expect(service).toBeTruthy();
  });
});
