import { TestBed } from '@angular/core/testing';

import { AdminservicesService } from './adminservices.service';

describe('AdminservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminservicesService = TestBed.get(AdminservicesService);
    expect(service).toBeTruthy();
  });
});
