import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFrameworkComponent } from './result-framework.component';

describe('ResultFrameworkComponent', () => {
  let component: ResultFrameworkComponent;
  let fixture: ComponentFixture<ResultFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
