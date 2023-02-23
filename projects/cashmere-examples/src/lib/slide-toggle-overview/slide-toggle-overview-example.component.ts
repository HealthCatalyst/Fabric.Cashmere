import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Slide Toggle overview
 */
@Component({
    selector: 'hc-slide-toggle-overview-example',
    templateUrl: 'slide-toggle-overview-example.component.html',
    styleUrls: ['slide-toggle-overview-example.component.scss']
})
export class SlideToggleOverviewExampleComponent {
    toggleStyle: UntypedFormControl = new UntypedFormControl('blue');
    toggleText: UntypedFormControl = new UntypedFormControl('on');
    toggleLabelPos: UntypedFormControl = new UntypedFormControl('left');
    toggleDisabled: UntypedFormControl = new UntypedFormControl(false);
}
