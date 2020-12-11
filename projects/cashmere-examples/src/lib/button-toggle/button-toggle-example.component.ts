import { Component } from '@angular/core';
import { ButtonToggleChangeEvent, ButtonToggleComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html',
    styleUrls: ['button-toggle-example.component.scss']
})
export class ButtonToggleExampleComponent {
    public selectedButtonToggleValue: string = '';
    public multiSelectedButtonToggleValues: string[];
    public multiSelectedButtonToggles: ButtonToggleComponent[];
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

