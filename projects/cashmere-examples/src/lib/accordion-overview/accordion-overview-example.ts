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
    triggerToolbar = true;
    triggerButton = 'Toolbar Trigger: On';

    toggleAlign(): void {
        this.alignment = this.alignment === 'left' ? 'right' : 'left';
    }

    toggleToolbar(): void {
        this.hideToolbar = !this.hideToolbar;
    }

    toggleToolbarTrigger(): void {
        this.triggerToolbar = !this.triggerToolbar;
        if (this.triggerToolbar) {
            this.triggerButton = 'Toolbar Trigger: On';
        } else {
            this.triggerButton = 'Toolbar Trigger: Off';
        }
    }
}
