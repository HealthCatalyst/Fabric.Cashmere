import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Slide Toggle overview
 */
@Component({
    selector: 'hc-slide-toggle-overview-example',
    templateUrl: 'slide-toggle-overview-example.component.html',
    styleUrls: ['slide-toggle-overview-example.component.scss']
})
export class SlideToggleOverviewExampleComponent {
    toggleStyle: FormControl = new FormControl('blue');
    toggleText: FormControl = new FormControl('on');
    toggleLabelPos: FormControl = new FormControl('left');
    toggleDisabled: FormControl = new FormControl(false);
}
