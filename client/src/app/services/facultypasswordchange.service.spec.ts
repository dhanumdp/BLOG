import { TestBed } from '@angular/core/testing';

import { FacultypasswordchangeService } from './facultypasswordchange.service';

describe('FacultypasswordchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacultypasswordchangeService = TestBed.get(FacultypasswordchangeService);
    expect(service).toBeTruthy();
  });
});
