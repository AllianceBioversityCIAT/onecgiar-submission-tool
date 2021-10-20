import { TestBed } from '@angular/core/testing';

import { WpDataControlService } from './wp-data-control.service';

describe('WpDataControlService', () => {
  let service: WpDataControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpDataControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
