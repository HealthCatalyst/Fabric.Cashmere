import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, NgModel} from '@angular/forms';
import {Component, DebugElement, QueryList, ViewChildren} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RadioButtonChangeEvent, RadioGroupDirective} from './radio';
import {RadioButtonModule} from './radio-button.module';

@Component({
    template: `
        <hc-radio-group [id]="groupId" [name]="groupName" [value]="groupValue" [disabled]="isDisabled" (change)="onGroupChange($event)">
            <hc-radio-button [value]="oneValue" [checked]="oneChecked">Radio One</hc-radio-button>
            <hc-radio-button [value]="twoValue" [checked]="twoChecked">Radio Two</hc-radio-button>
        </hc-radio-group>
    `
})
class TestRadioGroupComponent {
    oneChecked: boolean = true;
    twoChecked: boolean = false;
    oneValue: string = 'radio_one';
    twoValue: string = 'radio_two';
    groupId: string | null = 'simple-radio-group';
    groupName: string | null = 'radio-group-name';
    groupValue: string = 'radio_one';
    isDisabled: boolean = false;

    onGroupChange: (event?: RadioButtonChangeEvent) => void = () => {};
}

describe('RadioGroupComponent', () => {
    let component: TestRadioGroupComponent;
    let fixture: ComponentFixture<TestRadioGroupComponent>;
    let el: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestRadioGroupComponent],
            imports: [FormsModule, RadioButtonModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioGroupComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.query(By.directive(RadioGroupDirective));
        fixture.detectChanges();
    });

    it('should detect radio group directive', () => {
        expect(el).not.toBeNull();
    });

    it('should preserve the user-provided id', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.id).toBe('simple-radio-group');
    });

    it('should set the id for the radio group to the name if no id is set', () => {
        component.groupId = null;
        fixture.detectChanges();

        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.id).toMatch('radio-group-name');
    });

    it('should set a unique id for the radio group if no name or id is set', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        directiveInstance.name = "";
        directiveInstance.id = "";

        expect(directiveInstance.id).toMatch(/hc-radio-group-\d+/);
    });

    it('should store a list of the included radio buttons', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.radios).not.toBeNull();
    });

    it('should update the layout orientation', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.inline).toBe(false);

        directiveInstance.inline = true;
        fixture.detectChanges();

        expect(directiveInstance.inline).toBe(true);

        directiveInstance.inline = false;
        fixture.detectChanges();

        expect(directiveInstance.inline).toBe(false);
    });

    it('should set the group as required', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.required).toBe(false);

        directiveInstance.required = true;
        fixture.detectChanges();

        expect(directiveInstance.required).toBe(true);

        directiveInstance.required = false;
        fixture.detectChanges();

        expect(directiveInstance.required).toBe(false);
    });

    it('should set the group as disabled', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.disabled).toBe(false);

        directiveInstance.disabled = true;
        fixture.detectChanges();

        expect(directiveInstance.disabled).toBe(true);

        directiveInstance.disabled = false;
        fixture.detectChanges();

        expect(directiveInstance.disabled).toBe(false);
    });

    it('should set radio buttons to disabled when the group is disabled', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        directiveInstance.disabled = true;
        fixture.detectChanges();

        expect(directiveInstance.radios.last.disabled).toBe(true);
    });

    it('should set the value of the group when a radio button is clicked', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);

        let inputElement = <HTMLInputElement>directiveInstance.radios.last._elementRef.nativeElement.querySelector('input');
        inputElement.click();

        fixture.detectChanges();

        expect(directiveInstance.value).toBe('radio_two');
    });

    it('should set the selected property of the group when a radio button is clicked', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        let inputElement = <HTMLInputElement>directiveInstance.radios.last._elementRef.nativeElement.querySelector('input');
        inputElement.click();

        let newValue = directiveInstance.selected;
        fixture.detectChanges();

        expect(directiveInstance.selected).not.toBeNull();
        if (directiveInstance.selected) {
            expect(directiveInstance.selected.value).toBe('radio_two');
        }
    });

    it('should update the selected radio button when the groups value is changed', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);

        directiveInstance.value = 'radio_two';
        fixture.detectChanges();

        expect(directiveInstance.radios.last.checked).toBe(true);
    });

    it('should emit a change event when a radio button is clicked', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        spyOn(component, 'onGroupChange');

        expect(directiveInstance.radios.last.checked).toBe(false);

        let inputElement = <HTMLInputElement>directiveInstance.radios.last._elementRef.nativeElement.querySelector('input');
        inputElement.click();
        fixture.detectChanges();

        expect(directiveInstance.radios.last.checked).toBe(true);

        expect(component.onGroupChange).toHaveBeenCalledTimes(1);
    });
});

@Component({
    template: `
        <hc-radio-group [(ngModel)]="isGood">
            <hc-radio-button value="one">One</hc-radio-button>
            <hc-radio-button value="two">Two</hc-radio-button>
        </hc-radio-group>
    `
})
class RadioWithNgModelComponent {
    isGood: string = 'one';
}

describe('RadioGroups with ngModel', () => {
    let component: RadioWithNgModelComponent;
    let fixture: ComponentFixture<RadioWithNgModelComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RadioWithNgModelComponent],
            imports: [RadioButtonModule, FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioWithNgModelComponent);
        fixture.detectChanges();

        component = fixture.componentInstance;
        el = fixture.debugElement.query(By.directive(RadioGroupDirective));
        fixture.detectChanges();
    });

    it('should set a value correctly using ngModel', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);

        let inputElement = <HTMLInputElement>directiveInstance.radios.last._elementRef.nativeElement.querySelector('input');
        inputElement.click();
        fixture.detectChanges();

        expect(component.isGood).toBe('two');
    });
});
