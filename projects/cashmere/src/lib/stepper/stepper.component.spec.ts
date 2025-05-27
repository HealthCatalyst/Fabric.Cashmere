import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StepInterface} from './stepper.component';
import {StepperModule} from './stepper.module';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `
    <hc-stepper
        [color]="colorVal"
        [type]="typeVal"
        [showStepCount]="countVal"
        [steps]="stepsVal"
        [useRouterOutlet]="routerVal"
        [(activeIndex)]="currentStep">
    </hc-stepper>
    `,
    standalone: false
})
export class TestStepperComponent {
    colorVal = 'red';
    typeVal = 'isolated';
    countVal = true;
    routerVal = false;
    currentStep = 1;

    stepsVal: StepInterface[] = [
        {label: 'One', iconSet: 'icon', icon: 'icon-check'},
        {label: 'Two'},
        {label: 'Three', iconSet: 'icon', icon: 'icon-lock', disabled: true}
    ];
}

describe('StepperComponent', () => {
    let component: TestStepperComponent;
    let fixture: ComponentFixture<TestStepperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestStepperComponent],
            imports: [StepperModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestStepperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set the stepper color based on the color parameter', () => {
        const comp = fixture.debugElement.query(By.css('hc-stepper'));
        expect(comp.nativeElement.classList.contains('hc-stepper-red')).toBe(true);
    });

    it('should throw an error if an index is set out of range', () => {
        expect(function() {
            component.currentStep = 10;
            fixture.detectChanges();
        }).toThrow(new Error('The hc-stepper activeIndex value of 10 is out of bounds'));
    });

    it('should set the stepper type based on the type parameter', () => {
        const comp = fixture.debugElement.query(By.css('div'));
        expect(comp.nativeElement.classList.contains('hc-stepper-isolated')).toBe(true);
    });

    it('should show numbers on the steps if showStepCount is set to true', () => {
        const stepSpans = fixture.debugElement.queryAll(By.css('span'));
        expect(stepSpans.length).toBe(12);
    });

    it('should omit the router-outlet if useRouterOutlet is set to false', () => {
        const outlets = fixture.debugElement.queryAll(By.css('router-outlet'));
        expect(outlets.length).toBe(0);
    });

    it('should set the current step based on the activeIndex', () => {
        component.currentStep = 0;
        fixture.detectChanges();

        const steps = fixture.debugElement.queryAll(By.css('.hc-step'));
        expect(steps[0].nativeElement.classList.contains('hc-step-isolated-active')).toBe(true);
    });

    it('should disable steps if their disabled parameter is set to true', () => {
        const steps = fixture.debugElement.queryAll(By.css('.hc-step'));
        expect(steps[2].nativeElement.classList.contains('hc-stepper-disabled')).toBe(true);
    });
});
