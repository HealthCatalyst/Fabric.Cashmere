import {Component, OnInit} from '@angular/core';
import {StepInterface} from '@healthcatalyst/cashmere';
import {FormControl} from '@angular/forms';

/**
 * @title Stepper overview
 */
@Component({
    selector: 'hc-stepper-overview-example',
    templateUrl: 'stepper-overview-example.component.html',
    styleUrls: ['stepper-overview-example.component.scss'],
    standalone: false
})
export class StepperOverviewExampleComponent implements OnInit {
    progressSteps: StepInterface[];
    currentColorController = new FormControl('green');
    colorOptions: string[] = ['green', 'blue', 'purple', 'orange', 'red'];
    currentTypeController = new FormControl('arrow');
    typeOptions: string[] = ['arrow', 'isolated'];
    showStepsController = new FormControl(true);
    currentStep = 2;

    ngOnInit(): void {
        // To use with a router, add a `routerLink` to each step
        this.progressSteps = [
            {label: 'Winter', iconSet: 'hcicons2', icon: 'icon-check'},
            {label: 'January', iconSet: 'hcicons2', icon: 'icon-check'},
            {label: 'Spring'},
            {label: 'Summer'},
            {label: 'Fall', iconSet: 'hcicons2', icon: 'icon-lock', disabled: true},
            {label: 'Year Round', iconSet: 'hcicons2', icon: 'icon-lock', disabled: true}
        ];
    }
}
