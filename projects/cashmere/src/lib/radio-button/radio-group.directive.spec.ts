import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Component, DebugElement} from '@angular/core';
import {RadioGroupDirective} from './radio-group.directive';
import {By} from '@angular/platform-browser';

@Component({
    template: `<hc-radio-group [disabled]="true"></hc-radio-group>`
})
class TestRadioGroupComponent {}

describe('RadioButtonComponent', () => {
    let component: TestRadioGroupComponent;
    let fixture: ComponentFixture<TestRadioGroupComponent>;
    let el: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestRadioGroupComponent, RadioGroupDirective],
            imports: [FormsModule]
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

    it('should read disabled attribute input as true', () => {
        const directiveInstance = el.injector.get(RadioGroupDirective);
        expect(directiveInstance.disabled).toBe(true);
    });
});
