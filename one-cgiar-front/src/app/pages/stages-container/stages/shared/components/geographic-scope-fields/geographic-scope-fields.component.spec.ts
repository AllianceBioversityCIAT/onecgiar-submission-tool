import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicScopeFieldsComponent } from './geographic-scope-fields.component';

describe('GeographicScopeFieldsComponent', () => {
  let component: GeographicScopeFieldsComponent;
  let fixture: ComponentFixture<GeographicScopeFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicScopeFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicScopeFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
