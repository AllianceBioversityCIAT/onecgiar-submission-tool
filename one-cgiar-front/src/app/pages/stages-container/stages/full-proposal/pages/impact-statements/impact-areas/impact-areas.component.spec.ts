import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactAreasComponent } from './impact-areas.component';

describe('ImpactAreasComponent', () => {
  let component: ImpactAreasComponent;
  let fixture: ComponentFixture<ImpactAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
