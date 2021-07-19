import { TestBed } from '@angular/core/testing';

import { FullProposalService } from './full-proposal.service';

describe('FullProposalService', () => {
  let service: FullProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
