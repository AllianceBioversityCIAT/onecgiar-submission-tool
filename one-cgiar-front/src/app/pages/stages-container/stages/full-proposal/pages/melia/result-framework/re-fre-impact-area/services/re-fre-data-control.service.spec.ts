import { TestBed } from '@angular/core/testing';

import { ReFreDataControlService } from './re-fre-data-control.service';

describe('ReFreDataControlService', () => {
  let service: ReFreDataControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReFreDataControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
