import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Progress dots
 */
@Component({
    selector: 'hc-progress-dots-example',
    templateUrl: 'progress-dots-example.component.html',
    styleUrls: ['progress-dots-example.component.scss']
})
export class ProgressDotsExampleComponent {
    readonly dotsColor = new UntypedFormControl('light');
    readonly dotsMini = new UntypedFormControl(false);
    readonly dotsCentered = new UntypedFormControl(true);
}
