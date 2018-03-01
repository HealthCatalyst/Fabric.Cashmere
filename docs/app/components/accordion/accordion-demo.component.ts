import { Component } from '@angular/core';

@Component({
    templateUrl: './accordion-demo.component.html'
})

export class AccordionDemoComponent {
    alignment = 'left';
    hideToolbar = false;
    lastModified: Date = new Date( document.lastModified );

    toggleAlign(): void {
        this.alignment = this.alignment === 'left' ? 'right' : 'left';
    }

    toggleToolbar(): void {
        this.hideToolbar = !this.hideToolbar;
    }
}
