import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpResearchPlansAndTocsComponent } from './wp-research-plans-and-tocs.component';

describe('WpResearchPlansAndTocsComponent', () => {
  let component: WpResearchPlansAndTocsComponent;
  let fixture: ComponentFixture<WpResearchPlansAndTocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpResearchPlansAndTocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpResearchPlansAndTocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
