import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SelectModule } from './../lib/select/select.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIntegrationTestComponent } from './select-integration-test.component';
import { ReactiveFormsModule, FormBuilder, AbstractControl, FormControl } from '@angular/forms';

describe('SelectIntegrationTestComponent', () => {
  let component: SelectIntegrationTestComponent;
  let fixture: ComponentFixture<SelectIntegrationTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SelectModule],
      providers: [],
      declarations: [ SelectIntegrationTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIntegrationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass value into reactive forms', () => {
      const select = fixture.debugElement.query(By.css('select'));
      component.cityForm.patchValue({
          city: 'Atlanta'
      });
      fixture.detectChanges();
      expect(select.nativeElement.value).toEqual('Atlanta');
      component.cityForm.patchValue({
          city: 'SLC'
      });
      fixture.detectChanges();
      expect(select.nativeElement.value).toEqual('SLC');
  })

  it('should update value from select into reactive form model', () => {
    const select = fixture.debugElement.query(By.css('select'));
    select.nativeElement.value = 'SLC';
    select.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const city = component.cityForm.controls['city'].value || 'not-found';
    expect(city).toEqual('SLC');
  })

});
