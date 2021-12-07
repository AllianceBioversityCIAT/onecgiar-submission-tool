import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDynamicListComponent } from './menu-dynamic-list.component';

describe('MenuDynamicListComponent', () => {
  let component: MenuDynamicListComponent;
  let fixture: ComponentFixture<MenuDynamicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDynamicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDynamicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
