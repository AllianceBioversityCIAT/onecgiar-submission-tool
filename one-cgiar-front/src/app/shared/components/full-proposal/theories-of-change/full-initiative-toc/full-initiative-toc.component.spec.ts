import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInitiativeTOCComponent } from './full-initiative-toc.component';

describe('FullInitiativeTOCComponent', () => {
  let component: FullInitiativeTOCComponent;
  let fixture: ComponentFixture<FullInitiativeTOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullInitiativeTOCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInitiativeTOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
