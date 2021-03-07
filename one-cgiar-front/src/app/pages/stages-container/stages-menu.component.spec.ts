import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesMenuComponent } from './stages-menu.component';

describe('StagesMenuComponent', () => {
  let component: StagesMenuComponent;
  let fixture: ComponentFixture<StagesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
