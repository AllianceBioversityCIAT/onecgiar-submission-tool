import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaUserCardListComponent } from './ma-user-card-list.component';

describe('MaUserCardListComponent', () => {
  let component: MaUserCardListComponent;
  let fixture: ComponentFixture<MaUserCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaUserCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaUserCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
