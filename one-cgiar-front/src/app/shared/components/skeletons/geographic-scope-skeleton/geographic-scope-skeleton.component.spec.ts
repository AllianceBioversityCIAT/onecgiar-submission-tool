import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicScopeSkeletonComponent } from './geographic-scope-skeleton.component';

describe('GeographicScopeSkeletonComponent', () => {
  let component: GeographicScopeSkeletonComponent;
  let fixture: ComponentFixture<GeographicScopeSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicScopeSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicScopeSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
