import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBreadcrumbComponent } from './section-breadcrumb.component';

describe('SectionBreadcrumbComponent', () => {
  let component: SectionBreadcrumbComponent;
  let fixture: ComponentFixture<SectionBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
