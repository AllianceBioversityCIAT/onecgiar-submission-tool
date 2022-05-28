import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInformationButtonComponent } from './item-information-button.component';

describe('ItemInformationButtonComponent', () => {
  let component: ItemInformationButtonComponent;
  let fixture: ComponentFixture<ItemInformationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInformationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInformationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
