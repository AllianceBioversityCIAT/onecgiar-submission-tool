import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IaVisualReferenceComponent } from './ia-visual-reference.component';

describe('IaVisualReferenceComponent', () => {
  let component: IaVisualReferenceComponent;
  let fixture: ComponentFixture<IaVisualReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaVisualReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IaVisualReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
