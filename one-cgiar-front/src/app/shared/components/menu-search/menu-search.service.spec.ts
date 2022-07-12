import { TestBed } from '@angular/core/testing';

import { MenuSearchService } from './menu-search.service';

describe('MenuSearchService', () => {
  let service: MenuSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
