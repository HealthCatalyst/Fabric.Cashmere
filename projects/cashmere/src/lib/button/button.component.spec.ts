import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ButtonModule} from './button.module';

@Component({
    template: `
        <button hc-button [buttonStyle]="buttonStyle" [disabled]="isDisabled" (click)="buttonClick()">Button</button>
        <a hc-button [buttonStyle]="buttonStyle" [disabled]="isDisabled" href="https://www.healthcatalyst.com">Link</a>
    `
})
class TestAppComponent {
    buttonStyle = 'primary';
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
        this.buttonDebugElement = this.fixture.debugElement.query(By.css('button') as any) as any;
        this.aDebugElement = this.fixture.debugElement.query(By.css('a') as any) as any;
    }

    setStyle(style: string): void {
        this.testAppComponent.buttonStyle = style;
    }

    setIsDisabled(isDisabled: boolean): void {
        this.testAppComponent.isDisabled = isDisabled;
    }

    detectChanges() {
        this.fixture.detectChanges();
    }
}

describe('ButtonComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [TestAppComponent]
        }).compileComponents();
    }));

    it('should apply class based on buttonStyle property', () => {
        const testApp = new TestAppReference();
        const buttonStyles = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'link', 'link-inline'];

        buttonStyles.forEach(style => {
            testApp.setStyle(style);
            testApp.detectChanges();
            expect(testApp.buttonDebugElement.nativeElement.classList.contains(`hc-${style}`)).toBe(true);
            expect(testApp.aDebugElement.nativeElement.classList.contains(`hc-${style}`)).toBe(true);
        });
    });

    it('should not clear classes already defined on the element', () => {
        const testApp = new TestAppReference();

        testApp.buttonDebugElement.nativeElement.classList.add('user-class');
        testApp.aDebugElement.nativeElement.classList.add('user-class');
        testApp.setStyle('primary');
        testApp.detectChanges();

        expect(testApp.buttonDebugElement.nativeElement.classList.contains('hc-primary')).toBe(true);
        expect(testApp.buttonDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

        expect(testApp.aDebugElement.nativeElement.classList.contains('hc-primary')).toBe(true);
        expect(testApp.aDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

        testApp.setStyle('secondary');
        testApp.detectChanges();

        expect(testApp.buttonDebugElement.nativeElement.classList.contains('hc-secondary')).toBe(true);
        expect(testApp.buttonDebugElement.nativeElement.classList.contains('user-class')).toBe(true);

        expect(testApp.aDebugElement.nativeElement.classList.contains('hc-secondary')).toBe(true);
        expect(testApp.aDebugElement.nativeElement.classList.contains('user-class')).toBe(true);
    });

    it('should throw an error when unsupported style is used', () => {
        const testApp = new TestAppReference();
        expect(() => {
            testApp.setStyle('bigBirdYellow');
            testApp.detectChanges();
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
});
