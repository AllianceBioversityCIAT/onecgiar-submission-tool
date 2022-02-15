import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopKeyInnovationPoComponent } from './top-key-innovation-po.component';

describe('TopKeyInnovationPoComponent', () => {
  let component: TopKeyInnovationPoComponent;
  let fixture: ComponentFixture<TopKeyInnovationPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopKeyInnovationPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopKeyInnovationPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
