import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Progress dots
 */
@Component({
    selector: 'hc-progress-dots-example',
    templateUrl: 'progress-dots-example.component.html',
    styleUrls: ['progress-dots-example.component.scss']
})
export class ProgressDotsExampleComponent {
    readonly dotsColor = new FormControl('light');
    readonly dotsMini = new FormControl(false);
    readonly dotsCentered = new FormControl(true);
}
