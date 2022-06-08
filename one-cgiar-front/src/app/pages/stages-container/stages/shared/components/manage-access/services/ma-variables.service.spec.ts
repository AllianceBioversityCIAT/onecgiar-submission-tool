import { TestBed } from '@angular/core/testing';

import { MaVariablesService } from './ma-variables.service';

describe('MaVariablesService', () => {
  let service: MaVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
