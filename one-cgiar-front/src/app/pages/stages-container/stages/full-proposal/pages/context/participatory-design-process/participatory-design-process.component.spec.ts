import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';

describe('ParticipatoryDesignProcessComponent', () => {
  let component: ParticipatoryDesignProcessComponent;
  let fixture: ComponentFixture<ParticipatoryDesignProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatoryDesignProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatoryDesignProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
