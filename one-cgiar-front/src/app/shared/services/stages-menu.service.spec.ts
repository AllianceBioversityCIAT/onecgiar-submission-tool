import { TestBed } from '@angular/core/testing';

import { StagesMenuService } from './stages-menu.service';

describe('StagesMenuService', () => {
  let service: StagesMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StagesMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
