import {Component} from '@angular/core';

/**
 * @title Dynamic Content
 */
@Component({
    selector: 'popover-dynamic-example',
    templateUrl: 'popover-dynamic-example.html',
    styles: ['button { vertical-align: baseline; margin-left: 20px; }']
})
export class PopoverDynamicExample {
    body: string = 'dynamic content';
}
