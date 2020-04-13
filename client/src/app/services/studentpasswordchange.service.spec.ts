import { TestBed } from '@angular/core/testing';

import { StudentpasswordchangeService } from './studentpasswordchange.service';

describe('StudentpasswordchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentpasswordchangeService = TestBed.get(StudentpasswordchangeService);
    expect(service).toBeTruthy();
  });
});
