import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactAreaIsComponent } from './impact-area-is.component';

describe('ImpactAreaIsComponent', () => {
  let component: ImpactAreaIsComponent;
  let fixture: ComponentFixture<ImpactAreaIsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactAreaIsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactAreaIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
