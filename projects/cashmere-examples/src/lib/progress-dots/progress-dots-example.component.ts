import {Component} from '@angular/core';

/**
 * @title Progress dots
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'progress-dots-example.component.html',
    styleUrls: ['progress-dots-example.component.scss']
})
export class ProgressDotsExampleComponent {
    dotsColor = 'dark';
    dotsMini = false;
    dotsCentered = true;
}
