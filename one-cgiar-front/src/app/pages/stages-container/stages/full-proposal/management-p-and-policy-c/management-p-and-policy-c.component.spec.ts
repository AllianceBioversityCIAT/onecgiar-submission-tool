import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPAndPolicyCComponent } from './management-p-and-policy-c.component';

describe('ManagementPAndPolicyCComponent', () => {
  let component: ManagementPAndPolicyCComponent;
  let fixture: ComponentFixture<ManagementPAndPolicyCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPAndPolicyCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPAndPolicyCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
