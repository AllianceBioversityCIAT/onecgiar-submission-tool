import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IaTableComponent } from './ia-table.component';

describe('IaTableComponent', () => {
  let component: IaTableComponent;
  let fixture: ComponentFixture<IaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
