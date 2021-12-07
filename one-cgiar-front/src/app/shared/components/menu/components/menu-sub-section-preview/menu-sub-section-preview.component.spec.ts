import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubSectionPreviewComponent } from './menu-sub-section-preview.component';

describe('MenuSubSectionPreviewComponent', () => {
  let component: MenuSubSectionPreviewComponent;
  let fixture: ComponentFixture<MenuSubSectionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSubSectionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSubSectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
