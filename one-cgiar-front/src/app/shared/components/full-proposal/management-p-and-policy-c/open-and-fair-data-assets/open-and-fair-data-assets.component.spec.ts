import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAndFAIRDataAssetsComponent } from './open-and-fair-data-assets.component';

describe('OpenAndFAIRDataAssetsComponent', () => {
  let component: OpenAndFAIRDataAssetsComponent;
  let fixture: ComponentFixture<OpenAndFAIRDataAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAndFAIRDataAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAndFAIRDataAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
