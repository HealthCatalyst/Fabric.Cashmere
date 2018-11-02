import {Component} from '@angular/core';

/**
 * @title Dynamic Content
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'popover-dynamic-example.component.html',
    styleUrls: ['popover-dynamic-example.component.scss']
})
export class PopoverDynamicExampleComponent {
    body: string = 'dynamic content';
}
