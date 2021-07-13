import {Component, OnInit} from '@angular/core';
import {StepInterface} from '@healthcatalyst/cashmere';
import {FormControl} from '@angular/forms';

/**
 * @title Stepper overview
 */
@Component({
    selector: 'hc-stepper-overview-example',
    templateUrl: 'stepper-overview-example.component.html',
    styleUrls: ['stepper-overview-example.component.scss']
})
export class StepperOverviewExampleComponent implements OnInit {
    progressSteps: StepInterface[];
    readonly currentColorController = new FormControl('green');
    colorOptions: string[] = ['green', 'blue', 'purple', 'orange', 'red'];
    readonly currentTypeController = new FormControl('arrow');
    typeOptions: string[] = ['arrow', 'isolated'];
    readonly showStepsController = new FormControl(true);
    currentStep = 2;

    ngOnInit(): void {
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
}
