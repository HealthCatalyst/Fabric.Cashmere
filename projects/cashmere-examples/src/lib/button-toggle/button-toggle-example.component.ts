import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html',
    styleUrls: ['button-toggle-example.component.scss']
})
export class ButtonToggleExampleComponent {
    readonly isGridView = new UntypedFormControl(true);
    readonly condiments = new UntypedFormControl(['Mustard', 'Ketchup']);
}

