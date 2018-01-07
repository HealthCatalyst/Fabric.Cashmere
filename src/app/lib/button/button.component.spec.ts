import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { By } from '@angular/platform-browser';

@Component({
  template: `
      <button hc-button [color]="buttonColor" [disabled]="isDisabled" (click)="buttonClick()">Button</button>
      <a hc-button [color]="buttonColor" [disabled]="isDisabled" href="https://www.healthcatalyst.com">Link</a>
  `
})
class TestAppComponent {
  buttonColor = 'primary';
  isDisabled = false;
  clickCount = 0;

  buttonClick() {
    this.clickCount++;
  }
}

class TestAppReference {
  fixture: ComponentFixture<TestAppComponent>;
  testAppComponent: TestAppComponent;
  buttonDebugElement: DebugElement;
  aDebugElement: DebugElement;

  constructor() {
    this.fixture = TestBed.createComponent(TestAppComponent);
    this.testAppComponent = this.fixture.debugElement.componentInstance;
    this.buttonDebugElement = this.fixture.debugElement.query(By.css('button'));
    this.aDebugElement = this.fixture.debugElement.query(By.css('a'));
  }

  setColor(color: string): void {
    this.testAppComponent.buttonColor = color;
  }

  setIsDisabled(isDisabled: boolean): void {
    this.testAppComponent.isDisabled = isDisabled;
  }

  detectChanges() {
    this.fixture.detectChanges();
  }
}

describe('ButtonComponent', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule],
        declarations: [TestAppComponent]
      })
        .compileComponents();
    })
  );

  it('should apply class based on color property', () => {
    const testApp = new TestAppReference();
    const buttonColors = ['primary', 'primary-alt1', 'primary-alt2', 'primary-alt3', 'secondary', 'tertiary'];

    buttonColors.forEach(color => {
      testApp.setColor(color);
      testApp.detectChanges();
      expect(testApp.buttonDebugElement.nativeElement.classList.contains(`hc-${color}`)).toBe(true);
      expect(testApp.aDebugElement.nativeElement.classList.contains(`hc-${color}`)).toBe(true);
    });
  });

  it('should not clear classes already defined on the element', () => {
    const testApp = new TestAppReference();

    testApp.buttonDebugElement.nativeElement.classList.add('user-class');
    testApp.aDebugElement.nativeElement.classList.add('user-class');
    testApp.setColor('primary');
    testApp.detectChanges();

    expect(testApp.buttonDebugElement.nativeElement.classList.contains('hc-primary')).toBe(true);
    expect(testApp.buttonDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

    expect(testApp.aDebugElement.nativeElement.classList.contains('hc-primary')).toBe(true);
    expect(testApp.aDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

    testApp.setColor('secondary');
    testApp.detectChanges();

    expect(testApp.buttonDebugElement.nativeElement.classList.contains('hc-secondary')).toBe(true);
    expect(testApp.buttonDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

    expect(testApp.aDebugElement.nativeElement.classList.contains('hc-secondary')).toBe(true);
    expect(testApp.aDebugElement.nativeElement.classList.contains('user-class')).toBe(true);
  });

  it('should throw an error when unsupported color is used', () => {
    const testApp = new TestAppReference();

    expect(() => {
      testApp.setColor('bigBirdYellow');
      testApp.detectChanges()
    }).toThrow();
  });

  describe('button[hc-button]', () => {
    it('should set disabled property on host button', () => {
      const testApp = new TestAppReference();

      expect(testApp.buttonDebugElement.nativeElement.disabled).toBeFalsy('Expected button not to be disabled');

      testApp.setIsDisabled(true);
      testApp.detectChanges();

      expect(testApp.buttonDebugElement.nativeElement.disabled).toBeTruthy('Expected button to be disabled');
    });

    it('should increment when disabled is false', () => {
      const testApp = new TestAppReference();

      testApp.setIsDisabled(false);
      testApp.detectChanges();

      testApp.buttonDebugElement.nativeElement.click();
      expect(testApp.testAppComponent.clickCount).toEqual(1);
    });

    it('should not increment when button is disabled', () => {
      const testApp = new TestAppReference();

      testApp.setIsDisabled(true);
      testApp.detectChanges();

      testApp.buttonDebugElement.nativeElement.click();
      expect(testApp.testAppComponent.clickCount).toEqual(0);
    });
  });

  describe('a[hc-button]', () => {
    it('should not redirect if disabled', () => {
      const testApp = new TestAppReference();
      testApp.setIsDisabled(true);
      testApp.detectChanges();

      testApp.aDebugElement.nativeElement.click();
    });

    it('should add aria-disabled when disabled', () => {
      const testApp = new TestAppReference();
      testApp.detectChanges();
      expect(testApp.aDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');
      expect(testApp.aDebugElement.nativeElement.getAttribute('disabled')).toBeNull();

      testApp.setIsDisabled(true);
      testApp.detectChanges();
      expect(testApp.aDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
      expect(testApp.aDebugElement.nativeElement.getAttribute('disabled')).not.toBeNull();
    });

    it('should not add aria-disabled when disabled is false', () => {
      const testApp = new TestAppReference();
      testApp.detectChanges();
      expect(testApp.aDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');
      expect(testApp.aDebugElement.nativeElement.getAttribute('disabled')).toBeNull();

      testApp.setIsDisabled(false);
      testApp.detectChanges();
      expect(testApp.aDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');
      expect(testApp.aDebugElement.nativeElement.getAttribute('disabled')).toBeNull();
    });
  });
});
