import { TestBed } from '@angular/core/testing';

import { InitiativesService } from './initiatives.service';

describe('InitiativesService', () => {
  let service: InitiativesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiativesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
