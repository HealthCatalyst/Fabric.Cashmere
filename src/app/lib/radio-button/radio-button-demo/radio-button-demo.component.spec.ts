import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonDemoComponent } from './radio-button-demo.component';

describe('RadioButtonDemoComponent', () => {
  let component: RadioButtonDemoComponent;
  let fixture: ComponentFixture<RadioButtonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
