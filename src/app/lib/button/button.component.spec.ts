import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ButtonComponent } from './button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonOptions } from 'app/lib/cashmere';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [ButtonComponent],
        providers: [],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ButtonComponent);
          component = fixture.componentInstance;
          button = fixture.debugElement.query(By.css('button'));

          const defaultOptions: ButtonOptions = {
            buttonType: 'primary',
            buttonDisplayed: true
          }
          component.options = defaultOptions;

          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call event once when button clicked', () => {
    spyOn(component, 'clickButton');
    button.triggerEventHandler('click', null);
    expect(component.clickButton).toHaveBeenCalledTimes(1);
  });

  it('should emit click once when button clicked', () => {
    spyOn(component.onButtonClick, 'emit');
    button.triggerEventHandler('click', null);
    expect(component.onButtonClick.emit).toHaveBeenCalledTimes(1);
  });

  it('should not emit click when nothing happens', () => {
    spyOn(component.onButtonClick, 'emit');
    expect(component.onButtonClick.emit).not.toHaveBeenCalled();
  });

  it('primary button should have styles set properly', () => {
    component.options = {
      buttonType: 'primary'
    }
    fixture.detectChanges();
    expect(button.classes['btn']).toBe(true);
    expect(button.classes['btn-primary']).toBe(true);
  });

  it('primary button should not have btn-tertiary style', () => {
    component.options = {
      buttonType: 'primary'
    }
    fixture.detectChanges();
    expect(button.classes['btn']).toBe(true);
    expect(button.classes['btn-tertiary']).toBeFalsy();
  });

  it('tertiary button should not have btn-primary style', () => {
    component.options = {
      buttonType: 'tertiary'
    }
    fixture.detectChanges();
    expect(button.classes['btn']).toBe(true);
    expect(button.classes['btn-primary']).toBeFalsy();
  });

  it('icon style should be settable', () => {
    const iconOptions: ButtonOptions = {
      buttonType: 'primary',
      buttonDisplayed: true,
      buttonIcon: 'fa fa-rocket'
    }
    component.options = iconOptions;

    fixture.detectChanges();
    let icon: DebugElement = fixture.debugElement.query(By.css('span'));
    // change updates nativeElement but not debugElement
    expect(icon.nativeElement.className).toBe('fa fa-rocket');
  });

});
