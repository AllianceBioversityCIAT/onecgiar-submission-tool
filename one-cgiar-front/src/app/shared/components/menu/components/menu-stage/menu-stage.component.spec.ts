import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStageComponent } from './menu-stage.component';

describe('MenuStageComponent', () => {
  let component: MenuStageComponent;
  let fixture: ComponentFixture<MenuStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
