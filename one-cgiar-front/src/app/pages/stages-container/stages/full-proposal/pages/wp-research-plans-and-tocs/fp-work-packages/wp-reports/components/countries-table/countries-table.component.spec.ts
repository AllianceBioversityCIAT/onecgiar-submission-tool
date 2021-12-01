import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesTableComponent } from './countries-table.component';

describe('CountriesTableComponent', () => {
  let component: CountriesTableComponent;
  let fixture: ComponentFixture<CountriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
