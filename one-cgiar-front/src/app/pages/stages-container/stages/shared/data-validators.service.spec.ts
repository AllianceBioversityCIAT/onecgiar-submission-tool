import { TestBed } from '@angular/core/testing';

import { DataValidatorsService } from './data-validators.service';

describe('DataValidatorsService', () => {
  let service: DataValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
