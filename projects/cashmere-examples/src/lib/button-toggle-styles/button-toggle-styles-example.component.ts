import { Component } from '@angular/core';
import { ButtonToggleChangeEvent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-button-toggle-styles-example',
    templateUrl: 'button-toggle-styles-example.component.html',
    styleUrls: ['button-toggle-styles-example.component.scss']
})
export class ButtonToggleStylesExampleComponent {
    public selectedButtonToggleValue: string = '';
    public multiSelectedButtonToggleValues: string[];
    public buttonStyle: string = 'secondary';
    public size: string = 'md';

    public sizeSelectionChangedEvent(event: ButtonToggleChangeEvent): void {
        this.size = event.selectedValues ? event.selectedValues[0] : '';
    }

    public selectionChangedEvent(event: ButtonToggleChangeEvent): void {
        this.selectedButtonToggleValue = event.selectedValues ? event.selectedValues[0] : '';
    }

    public buttonStyleSelectionChangedEvent(event: ButtonToggleChangeEvent): void {
        this.buttonStyle = event.selectedValues ? event.selectedValues[0] : '';
    }

    public multiSelectionChangedEvent(event: ButtonToggleChangeEvent): void {
        this.multiSelectedButtonToggleValues = event.selectedValues ? event.selectedValues : [];
    }
}

