import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {StepperComponent, StepInterface, StepColor, StepType} from '@healthcatalyst/cashmere';

/**
 * @title Stepper overview
 */
@Component({
    selector: 'hc-stepper-overview-example',
    templateUrl: 'stepper-overview-example.component.html',
    styleUrls: ['stepper-overview-example.component.scss']
})
export class StepperOverviewExampleComponent implements OnInit, AfterViewInit {
    progressSteps: StepInterface[];
    colorOptions: StepColor[] = ['green', 'blue', 'purple', 'orange', 'red'];
    typeOptions: StepType[] = ['arrow', 'isolated'];
    showSteps: boolean  = true;

    @ViewChild('stepperElement') stepperElement: StepperComponent;

    ngOnInit() {
        // To use with a router, add a `routerLink` to each step
        this.progressSteps = [
            {label: 'Winter', iconSet: 'fa', icon: 'fa-check'},
            {label: 'January', iconSet: 'fa', icon: 'fa-check'},
            {label: 'Spring'},
            {label: 'Summer'},
            {label: 'Fall', iconSet: 'fa', icon: 'fa-lock', disabled: true},
            {label: 'Year Round', iconSet: 'fa', icon: 'fa-lock', disabled: true}
        ];
    }

    ngAfterViewInit() {
        this.stepperElement.activeIndex = 2;
        this.stepperElement.type = 'arrow';
        this.stepperElement.color = 'green';
        this.stepperElement.showStepCount = true;
    }
}
