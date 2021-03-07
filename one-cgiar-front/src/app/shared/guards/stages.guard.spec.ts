import { TestBed } from '@angular/core/testing';

import { StagesGuard } from './stages.guard';

describe('StagesGuard', () => {
  let guard: StagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
