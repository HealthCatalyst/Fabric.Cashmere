import { Component } from '@angular/core';
import { ButtonToggleComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html'
})
export class ButtonToggleExampleComponent {
    public selectedButtonToggle: ButtonToggleComponent;
    public multiSelectedButtonToggles: ButtonToggleComponent[];
    public buttonStyle: string = 'primary';

    public selectionChangedEvent(selection: ButtonToggleComponent): void {
        this.selectedButtonToggle = selection;
    }

    public buttonStyleSelectionChangedEvent(selection: ButtonToggleComponent): void {
        this.buttonStyle = selection.value;
    }

}

