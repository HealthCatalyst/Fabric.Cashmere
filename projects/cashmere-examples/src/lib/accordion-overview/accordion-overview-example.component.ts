import {Component} from '@angular/core';

/**
 * @title Accordion overview
 */

@Component({
    selector: 'hc-example',
    templateUrl: 'accordion-overview-example.component.html'
})
export class AccordionOverviewExampleComponent {
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
