import {Component} from '@angular/core';

/**
 * @title Dynamic Content
 */
@Component({
    selector: 'popover-dynamic-example',
    templateUrl: 'popover-dynamic-example.html',
    styleUrls: ['popover-dynamic-example.css']
})
export class PopoverDynamicExample {
    body: string = 'dynamic content';
}
