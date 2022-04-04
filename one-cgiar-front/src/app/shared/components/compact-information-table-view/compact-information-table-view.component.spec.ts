import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactInformationTableViewComponent } from './compact-information-table-view.component';

describe('CompactInformationTableViewComponent', () => {
  let component: CompactInformationTableViewComponent;
  let fixture: ComponentFixture<CompactInformationTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompactInformationTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactInformationTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
