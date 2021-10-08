import { TestBed } from '@angular/core/testing';

import { FullProposalRequestsService } from './full-proposal-requests.service';

describe('FullProposalRequestsService', () => {
  let service: FullProposalRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullProposalRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
