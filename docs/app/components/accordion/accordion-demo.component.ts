import { Component } from '@angular/core';

@Component({
    templateUrl: './accordion-demo.component.html',
    styleUrls: ['./accordion-demo.component.scss']
})
export class AccordionDemoComponent {
    alignment = 'left';
    hideToolbar = false;

    toggleAlign(): void {
        this.alignment = this.alignment === 'left' ? 'right' : 'left';
    }

    toggleToolbar(): void {
        this.hideToolbar = !this.hideToolbar;
    }
}
