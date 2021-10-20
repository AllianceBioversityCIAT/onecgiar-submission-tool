import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpTocComponent } from './wp-toc.component';

describe('WpTocComponent', () => {
  let component: WpTocComponent;
  let fixture: ComponentFixture<WpTocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpTocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
