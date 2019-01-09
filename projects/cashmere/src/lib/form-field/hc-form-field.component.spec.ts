/* tslint:disable:no-use-before-declare component-class-suffix */

import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {getControlMissing, HcFormFieldComponent} from './hc-form-field.component';
import {Component, DebugElement} from '@angular/core';
import {InputModule} from '../input/input.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('HcFormFieldComponent', () => {
    let fixture: ComponentFixture<any>;

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

        it('support type attribute', () => {});
    });

    describe('', () => {
        it('should not set type on textarea', () => {});
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

            inputControl.markAsTouched();
            fixture.detectChanges();

            expect(nativeElement.querySelectorAll('hc-error').length).toBe(1, 'Expected errors to be shown after being touched');
        });

        it('should show errors when form is submitted', () => {});

        it('should show errors when formGroup is submitted', () => {});

        it('should hide errors once the formControl is valid', () => {});
    });
});

@Component({
    template: `
        <hc-form-field>
            <hc-label>{{ inputLabel }}</hc-label>
            <input hcInput [id]="inputId" [disabled]="isDisabled" [required]="isRequired" />
        </hc-form-field>
    `
})
class SimpleInput {
    inputId: string | null = 'test-id';
    isDisabled: boolean = false;
    isRequired: boolean = true;
    inputLabel: string | null = 'hola';
}

@Component({
    template: `
        <hc-form-field> <input /> </hc-form-field>
    `
})
class InputMissingHcInput {}

@Component({
    template: `
        <hc-form-field>
            <input hcInput [formControl]="formControl" />
            <hc-error>Input is required</hc-error>
        </hc-form-field>
    `
})
class InputWithFormControl {
    formControl = new FormControl('', Validators.required);
}
