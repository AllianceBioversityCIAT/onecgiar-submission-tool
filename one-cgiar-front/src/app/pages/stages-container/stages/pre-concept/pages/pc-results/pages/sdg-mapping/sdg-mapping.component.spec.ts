import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgMappingComponent } from './sdg-mapping.component';

describe('SdgMappingComponent', () => {
  let component: SdgMappingComponent;
  let fixture: ComponentFixture<SdgMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
