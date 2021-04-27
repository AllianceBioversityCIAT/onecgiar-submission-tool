import { TestBed } from '@angular/core/testing';

import { DataControlService } from './data-control.service';

describe('DataControlService', () => {
  let service: DataControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
