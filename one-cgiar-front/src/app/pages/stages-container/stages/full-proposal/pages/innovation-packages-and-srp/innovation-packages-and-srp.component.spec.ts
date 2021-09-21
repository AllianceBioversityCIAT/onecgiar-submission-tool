import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationPackagesAndSrpComponent } from './innovation-packages-and-srp.component';

describe('InnovationPackagesAndSrpComponent', () => {
  let component: InnovationPackagesAndSrpComponent;
  let fixture: ComponentFixture<InnovationPackagesAndSrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationPackagesAndSrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationPackagesAndSrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
