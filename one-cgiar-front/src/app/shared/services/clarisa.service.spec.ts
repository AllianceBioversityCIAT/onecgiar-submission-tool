import { TestBed } from '@angular/core/testing';

import { ClarisaService } from './clarisa.service';

describe('ClarisaService', () => {
  let service: ClarisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClarisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
