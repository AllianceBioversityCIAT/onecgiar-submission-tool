import { TestBed } from '@angular/core/testing';

import { UnderConstructionGuard } from './under-construction.guard';

describe('UnderConstructionGuard', () => {
  let guard: UnderConstructionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnderConstructionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
