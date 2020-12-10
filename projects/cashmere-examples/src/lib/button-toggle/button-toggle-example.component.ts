import { Component } from '@angular/core';
import { ButtonToggleChangeEvent, ButtonToggleComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html'
})
export class ButtonToggleExampleComponent {
    public selectedButtonToggleValue: string;
    public multiSelectedButtonToggles: ButtonToggleComponent[];
    public buttonStyle: string = 'secondary';

    public selectionChangedEvent(event: ButtonToggleChangeEvent): void {
        console.log(event.value);
        this.selectedButtonToggleValue = event.value;
    }

    public buttonStyleSelectionChangedEvent(event: ButtonToggleChangeEvent): void {
        this.buttonStyle = event.value;
    }

}

