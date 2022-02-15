import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeCreatorComponent } from './initiative-creator.component';

describe('InitiativeCreatorComponent', () => {
  let component: InitiativeCreatorComponent;
  let fixture: ComponentFixture<InitiativeCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
