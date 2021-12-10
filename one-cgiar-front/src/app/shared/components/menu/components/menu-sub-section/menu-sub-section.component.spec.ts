import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubSectionComponent } from './menu-sub-section.component';

describe('MenuSubSectionComponent', () => {
  let component: MenuSubSectionComponent;
  let fixture: ComponentFixture<MenuSubSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSubSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
