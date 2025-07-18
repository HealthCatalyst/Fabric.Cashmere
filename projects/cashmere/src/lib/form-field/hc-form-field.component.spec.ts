/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {getControlMissing, HcFormFieldComponent} from './hc-form-field.component';
import {Component, DebugElement, ElementRef, ViewChild} from '@angular/core';
import {InputModule} from '../input/input.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('HcFormFieldComponent', () => {
    let fixture: ComponentFixture<unknown>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputModule, FormFieldModule, FormsModule, ReactiveFormsModule],
            declarations: [SimpleInput, InputMissingHcInput, InputWithFormControl]
        }).compileComponents();
    }));

    describe('basic behaviors', () => {
        let inputElement: HTMLInputElement;
        let labelElement: HTMLLabelElement;
        let formFieldDebugElement: DebugElement;
        let testComponent: SimpleInput;

        beforeEach(() => {
            fixture = TestBed.createComponent(SimpleInput);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;
            inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
            formFieldDebugElement = fixture.debugElement.query(By.directive(HcFormFieldComponent));
        });

        it('should not overwrite an existing id', () => {
            expect(inputElement.id).toBe('test-id');
            expect(labelElement.getAttribute('for')).toBe('test-id');
        });

        it('should set a default id', () => {
            testComponent.inputId = null;
            fixture.detectChanges();

            expect(inputElement.id).toMatch(/hc-input-\d+/);
            expect(labelElement.getAttribute('for')).toBe(inputElement.id);
        });

        it('should show required marker', () => {
            expect(labelElement.textContent).toMatch(/hola\s+\*/g);
        });

        it('support disabled attribute', () => {
            const nativeFormField = formFieldDebugElement.nativeElement;
            expect(nativeFormField.classList.contains('hc-form-field-disabled')).toBe(
                false,
                'Expected form field not to start out disabled'
            );
            expect(inputElement.disabled).toBe(false);

            testComponent.isDisabled = true;
            fixture.detectChanges();

            expect(nativeFormField.classList.contains('hc-form-field-disabled')).toBe(true, 'Expected form field to have disabled class');
            expect(inputElement.disabled).toBe(true);
        });

        it('should hide required marker when control is disabled', () => {
            testComponent.isDisabled = true;
            fixture.detectChanges();

            expect(labelElement.textContent).toMatch(/^hola$/);
        });

    });

    describe('validation', () => {
        it('should throw error if hcInput is not present', fakeAsync(() => {
            fixture = TestBed.createComponent(InputMissingHcInput);
            expect(() => fixture.detectChanges()).toThrowError(getControlMissing().message);
        }));
    });

    describe('with forms', () => {
        let inputElement: HTMLInputElement;
        let labelElement: HTMLLabelElement;
        let formFieldDebugElement: DebugElement;
        let testComponent: InputWithFormControl;

        beforeEach(() => {
            fixture = TestBed.createComponent(InputWithFormControl);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;
            inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
            formFieldDebugElement = fixture.debugElement.query(By.directive(HcFormFieldComponent));
        });

        it('should not show errors when untouched', () => {
            const nativeElement = formFieldDebugElement.nativeElement;
            const inputControl = testComponent.formControl;
            expect(inputControl.valid).toBe(false, 'Expected form to be invalid');
            expect(nativeElement.querySelectorAll('hc-error').length).toBe(0, 'Expected no errors to be shown when untouched');

            testComponent.inputElement.nativeElement.focus();
            inputControl.markAsTouched();
            testComponent.inputElement.nativeElement.blur();
            fixture.detectChanges();

            expect(nativeElement.querySelectorAll('hc-error').length).toBe(1, 'Expected errors to be shown after being touched');
        });
    });
});

@Component({
    template: `
        <hc-form-field>
            <hc-label>{{ inputLabel }}</hc-label>
            <input hcInput [id]="inputId" [disabled]="isDisabled" [required]="isRequired" />
        </hc-form-field>
    `,
    standalone: false
})
class SimpleInput {
    inputId: string | null = 'test-id';
    isDisabled = false;
    isRequired = true;
    inputLabel: string | null = 'hola';
}

@Component({
    template: `
        <hc-form-field>
            <hc-label>Simple:</hc-label>
            <input />
        </hc-form-field>
    `,
    standalone: false
})
class InputMissingHcInput {}

@Component({
    template: `
        <hc-form-field>
            <hc-label>Form Control Label:</hc-label>
            <input hcInput [formControl]="formControl" #inputElement/>
            <hc-error>Input is required</hc-error>
        </hc-form-field>
    `,
    standalone: false
})
class InputWithFormControl {
    formControl = new FormControl('', Validators.required);

    @ViewChild('inputElement', {static: false})
    inputElement: ElementRef;
}
