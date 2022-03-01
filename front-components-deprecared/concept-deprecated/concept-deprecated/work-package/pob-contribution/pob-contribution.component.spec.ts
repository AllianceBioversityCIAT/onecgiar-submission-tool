import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobContributionComponent } from './pob-contribution.component';

describe('PobContributionComponent', () => {
  let component: PobContributionComponent;
  let fixture: ComponentFixture<PobContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
