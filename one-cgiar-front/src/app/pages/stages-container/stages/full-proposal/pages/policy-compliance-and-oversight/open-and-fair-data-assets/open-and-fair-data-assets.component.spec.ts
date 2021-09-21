import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAndFairDataAssetsComponent } from './open-and-fair-data-assets.component';

describe('OpenAndFairDataAssetsComponent', () => {
  let component: OpenAndFairDataAssetsComponent;
  let fixture: ComponentFixture<OpenAndFairDataAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAndFairDataAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAndFairDataAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
