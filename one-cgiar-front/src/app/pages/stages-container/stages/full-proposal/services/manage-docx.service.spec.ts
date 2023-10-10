import { TestBed } from '@angular/core/testing';

import { ManageDocxService } from './manage-docx.service';

describe('ManageDocxService', () => {
  let service: ManageDocxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDocxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
