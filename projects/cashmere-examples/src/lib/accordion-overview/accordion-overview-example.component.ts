import {Component} from '@angular/core';

/**
 * @title Accordion overview
 */

@Component({
    selector: 'hc-accordion-overview-example',
    templateUrl: 'accordion-overview-example.component.html',
    standalone: false
})
export class AccordionOverviewExampleComponent {
    alignment = 'left';
    hideToolbar = false;
    triggerToolbar = true;
    triggerButton = 'Toolbar Trigger: On';
    disableToolbar = false;
    disableButton = 'Disable Toolbar';

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

    toggleToolbarDisable(): void {
        this.disableToolbar = !this.disableToolbar;
        if (this.disableToolbar) {
            this.disableButton = 'Enable Toolbar';
        } else {
            this.disableButton = 'Disable Toolbar';
        }
    }
}
