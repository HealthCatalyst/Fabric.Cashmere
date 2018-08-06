import {Component} from '@angular/core';

/**
 * @title Accordion overview
 */

@Component({
    selector: 'accordion-overview-example',
    templateUrl: 'accordion-overview-example.html',
    styleUrls: ['accordion-overview-example.css']
})
export class AccordionOverviewExample {
    alignment = 'left';
    hideToolbar = false;

    toggleAlign(): void {
        this.alignment = this.alignment === 'left' ? 'right' : 'left';
    }

    toggleToolbar(): void {
        this.hideToolbar = !this.hideToolbar;
    }
}
