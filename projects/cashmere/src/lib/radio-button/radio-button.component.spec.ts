import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RadioButtonComponent, RadioButtonChangeEvent} from './radio';
import {RadioButtonModule} from './radio-button.module';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <div (click)="parentElementClicked = true" (keyup)="parentElementKeyedUp = true">
            <hc-radio-button
                [id]="radioId"
                [required]="isRequired"
                [checked]="isChecked"
                [disabled]="isDisabled"
                [value]="radioValue"
                (change)="onRadioChange($event)"
            >
                Simple radio button
            </hc-radio-button>
        </div>
    `,
    standalone: false
})
export class SingleRadioComponent {
    isChecked = false;
    isRequired = false;
    isIndeterminate = false;
    isDisabled = false;
    parentElementClicked = false;
    parentElementKeyedUp = false;
    radioId: string | null = 'simple-radio';
    radioValue = 'single_radio';

    onRadioClick: (event?: Event) => void = () => null;
    onRadioChange: (event?: RadioButtonChangeEvent) => void = () => null;
}

describe('RadioButtonComponent', () => {
    let fixture: ComponentFixture<unknown>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RadioButtonModule],
            declarations: [SingleRadioComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(RadioButtonComponent);
    }));

    describe('basic behaviors', () => {
        let radioDebugElement: DebugElement;
        let radioNativeElement: HTMLElement;
        let radioInstance: RadioButtonComponent;
        let testComponent: SingleRadioComponent;

        let inputElement: HTMLInputElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(SingleRadioComponent);
            fixture.detectChanges();

            radioDebugElement = fixture.debugElement.query(By.directive(RadioButtonComponent));
            radioNativeElement = radioDebugElement.nativeElement;
            radioInstance = radioDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;

            inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');

            fixture.detectChanges();
        });

        it('should add and remove checked state', () => {
            expect(radioInstance.checked).toBe(false);
            expect(inputElement.checked).toBe(false);

            testComponent.isChecked = true;
            fixture.detectChanges();

            expect(radioInstance.checked).toBe(true);
            expect(inputElement.checked).toBe(true);

            testComponent.isChecked = false;
            fixture.detectChanges();

            expect(radioInstance.checked).toBe(false);
            expect(inputElement.checked).toBe(false);
        });

        it('should toggle checked state on click', () => {
            expect(radioInstance.checked).toBe(false);

            inputElement.click();
            fixture.detectChanges();

            expect(radioInstance.checked).toBe(true);
        });

        it('should change native element checked when check programmatically', () => {
            expect(inputElement.checked).toBe(false);

            radioInstance.checked = true;
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);
        });

        it('should add and remove disabled state', () => {
            expect(radioInstance.disabled).toBe(false);
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);

            testComponent.isDisabled = true;
            fixture.detectChanges();

            expect(radioInstance.disabled).toBe(true);
            expect(inputElement.disabled).toBe(true);

            testComponent.isDisabled = false;
            fixture.detectChanges();

            expect(radioInstance.disabled).toBe(false);
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
        });

        it('should not toggle `checked` state upon interaction while disabled', () => {
            testComponent.isDisabled = true;
            fixture.detectChanges();

            inputElement.click();
            expect(radioInstance.checked).toBe(false);
        });

        it('should preserve the user-provided id', () => {
            expect(radioNativeElement.id).toBe('simple-radio');
            expect(inputElement.id).toBe('simple-radio-input');
        });

        it('should generate a unique id for the radio button input if no id is set', () => {
            testComponent.radioId = null;
            fixture.detectChanges();

            expect(radioInstance._inputId).toMatch(/hc-radio-button-\d+/);
            expect(inputElement.id).toBe(radioInstance._inputId);
        });

        it('should forward the required attribute', () => {
            testComponent.isRequired = true;
            fixture.detectChanges();

            expect(inputElement.required).toBe(true);

            testComponent.isRequired = false;
            fixture.detectChanges();

            expect(inputElement.required).toBe(false);
        });

        it('should forward the value to input element', () => {
            testComponent.radioValue = 'basic_radio';
            fixture.detectChanges();

            expect(inputElement.value).toBe('basic_radio');
        });

        it('should emit a change event when clicked', () => {
            spyOn(testComponent, 'onRadioChange');

            expect(inputElement.checked).toBe(false);

            inputElement.click();
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);

            expect(testComponent.onRadioChange).toHaveBeenCalledTimes(1);
        });
    });
});
