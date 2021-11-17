import { TestBed } from '@angular/core/testing';

import { ManageExcelService } from './manage-excel.service';

describe('ManageExcelService', () => {
  let service: ManageExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
