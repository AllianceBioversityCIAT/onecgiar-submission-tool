import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaUserCardComponent } from './ma-user-card.component';

describe('MaUserCardComponent', () => {
  let component: MaUserCardComponent;
  let fixture: ComponentFixture<MaUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
