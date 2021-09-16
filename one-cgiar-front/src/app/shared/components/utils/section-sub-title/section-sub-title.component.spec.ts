import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSubTitleComponent } from './section-sub-title.component';

describe('SectionSubTitleComponent', () => {
  let component: SectionSubTitleComponent;
  let fixture: ComponentFixture<SectionSubTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSubTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
