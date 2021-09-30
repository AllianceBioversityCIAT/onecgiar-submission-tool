import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInitiativeTocComponent } from './full-initiative-toc.component';

describe('FullInitiativeTocComponent', () => {
  let component: FullInitiativeTocComponent;
  let fixture: ComponentFixture<FullInitiativeTocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullInitiativeTocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInitiativeTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
