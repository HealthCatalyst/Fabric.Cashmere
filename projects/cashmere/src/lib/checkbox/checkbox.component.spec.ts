import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {CheckboxChangeEvent, CheckboxComponent} from './checkbox.component';
import {FormControl, FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {Component, DebugElement} from '@angular/core';
import {CheckboxModule} from './checkbox.module';
import {By} from '@angular/platform-browser';

describe('CheckboxComponent', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [CheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [SingleCheckboxComponent, CheckboxWithFormControlComponent, CheckboxWithNgModelComponent]
        }).compileComponents();
    }));

    describe('basic behaviors', () => {
        let checkboxDebugElement: DebugElement;
        let checkboxNativeElement: HTMLElement;
        let checkboxInstance: CheckboxComponent;
        let testComponent: SingleCheckboxComponent;

        let inputElement: HTMLInputElement;
        let labelElement: HTMLLabelElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(SingleCheckboxComponent);
            fixture.detectChanges();

            checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkboxInstance = checkboxDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;

            inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
            labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label.hc-checkbox-label');

            fixture.detectChanges();
        });

        it('should add and remove checked state', () => {
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('hc-checkbox-checked');
            expect(inputElement.checked).toBe(false);

            testComponent.isChecked = true;
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxNativeElement.classList).toContain('hc-checkbox-checked');
            expect(inputElement.checked).toBe(true);

            testComponent.isChecked = false;
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('hc-checkbox-checked');
            expect(inputElement.checked).toBe(false);
        });

        it('should toggle checked state on click', () => {
            expect(checkboxInstance.checked).toBe(false);

            labelElement.click();
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(true);

            labelElement.click();
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(false);
        });

        it('should change native element checked when check programmatically', () => {
            expect(inputElement.checked).toBe(false);

            checkboxInstance.checked = true;
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);
        });

        it('should add and remove disabled state', () => {
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('hc-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);

            testComponent.isDisabled = true;
            fixture.detectChanges();

            expect(checkboxInstance.disabled).toBe(true);
            expect(checkboxNativeElement.classList).toContain('hc-checkbox-disabled');
            expect(inputElement.disabled).toBe(true);

            testComponent.isDisabled = false;
            fixture.detectChanges();

            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('hc-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
        });

        it('should not toggle `checked` state upon interaction while disabled', () => {
            testComponent.isDisabled = true;
            fixture.detectChanges();

            checkboxNativeElement.click();
            expect(checkboxInstance.checked).toBe(false);
        });

        it('should preserve the user-provided id', () => {
            expect(checkboxNativeElement.id).toBe('simple-check');
            expect(inputElement.id).toBe('simple-check-input');
        });

        it('should generate a unique id for the checkbox input if no id is set', () => {
            testComponent.checkboxId = null;
            fixture.detectChanges();

            expect(checkboxInstance._inputId).toMatch(/hc-checkbox-\d+/);
            expect(inputElement.id).toBe(checkboxInstance._inputId);
        });

        it('should not trigger the click event multiple times', () => {
            // By default, when clicking on a label element, a generated click will be dispatched
            // on the associated input element.
            // Since we're using a label element and a visual hidden input, this behavior can led
            // to an issue, where the click events on the checkbox are getting executed twice.

            spyOn(testComponent, 'onCheckboxClick');

            expect(inputElement.checked).toBe(false);

            labelElement.click();
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);

            expect(testComponent.onCheckboxClick).toHaveBeenCalledTimes(1);
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
            testComponent.checkboxValue = 'basic_checkbox';
            fixture.detectChanges();

            expect(inputElement.value).toBe('basic_checkbox');
        });

        it('should align the checkbox label based on the align parameter', () => {
            let alignClass = fixture.debugElement.queryAll(By.css('.hc-checkbox-align-top'));
            expect(alignClass.length).toBe(1);
        });
    });

    describe('with form control', () => {
        let checkboxDebugElement: DebugElement;
        let checkboxInstance: CheckboxComponent;
        let testComponent: CheckboxWithFormControlComponent;
        let inputElement: HTMLInputElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckboxWithFormControlComponent);
            fixture.detectChanges();

            checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            checkboxInstance = checkboxDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;
            inputElement = <HTMLInputElement>checkboxDebugElement.nativeElement.querySelector('input');
        });

        it('should toggle the disabled state', () => {
            expect(checkboxInstance.disabled).toBe(false);

            testComponent.formControl.disable();
            fixture.detectChanges();

            expect(checkboxInstance.disabled).toBe(true);
            expect(inputElement.disabled).toBe(true);

            testComponent.formControl.enable();
            fixture.detectChanges();

            expect(checkboxInstance.disabled).toBe(false);
            expect(inputElement.disabled).toBe(false);
        });
    });

    describe('with required ngModel', () => {
        let checkboxInstance: CheckboxComponent;
        let inputElement: HTMLInputElement;
        let testComponent: CheckboxWithNgModelComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckboxWithNgModelComponent);
            fixture.detectChanges();

            let checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            let checkboxNativeElement = checkboxDebugElement.nativeElement;
            testComponent = fixture.debugElement.componentInstance;
            checkboxInstance = checkboxDebugElement.componentInstance;
            inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        });

        it('should validate with RequiredTrue validator', () => {
            let checkboxElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            let ngModel = checkboxElement.injector.get<NgModel>(NgModel);

            testComponent.isRequired = true;
            inputElement.click();
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(true);
            expect(ngModel.valid).toBe(true);

            inputElement.click();
            fixture.detectChanges();

            expect(checkboxInstance.checked).toBe(false);
            expect(ngModel.valid).toBe(false);
        });
    });
});

@Component({
    template: `
        <div (click)="parentElementClicked = true" (keyup)="parentElementKeyedUp = true">
            <hc-checkbox
                [id]="checkboxId"
                [required]="isRequired"
                [checked]="isChecked"
                [indeterminate]="isIndeterminate"
                [disabled]="isDisabled"
                [align]="alignVal"
                [value]="checkboxValue"
                (click)="onCheckboxClick($event)"
                (change)="onCheckboxChange($event)"
            >
                Simple checkbox
            </hc-checkbox>
        </div>
    `
})
export class SingleCheckboxComponent {
    isChecked: boolean = false;
    isRequired: boolean = false;
    isIndeterminate: boolean = false;
    isDisabled: boolean = false;
    parentElementClicked: boolean = false;
    parentElementKeyedUp: boolean = false;
    checkboxId: string | null = 'simple-check';
    checkboxValue: string = 'single_checkbox';
    alignVal: string = "top";

    onCheckboxClick: (event?: Event) => void = () => {};
    onCheckboxChange: (event?: CheckboxChangeEvent) => void = () => {};
}

@Component({
    template: `
        <hc-checkbox [formControl]="formControl"></hc-checkbox>
    `
})
class CheckboxWithFormControlComponent {
    formControl = new FormControl();
}

@Component({
    template: `
        <hc-checkbox [required]="isRequired" [(ngModel)]="isGood">Be good</hc-checkbox>
    `
})
class CheckboxWithNgModelComponent {
    isGood: boolean = false;
    isRequired: boolean = true;
}
