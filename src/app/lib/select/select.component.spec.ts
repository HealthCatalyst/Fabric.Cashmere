import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [ SelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change opacity when disabled', () => {
    component.disabled = true;
    expect(component.alpha).toEqual(component.disabledAlpha);
  })

  it('should work with reactive forms', () => {
    const fb: FormBuilder = new FormBuilder();
    const testForm = fb.group({
      testVal: 'testVal 1',
      testVal2: 'testVal 2'
    });


  })
});
