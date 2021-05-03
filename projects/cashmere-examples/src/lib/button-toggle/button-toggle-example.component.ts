import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html',
    styleUrls: ['button-toggle-example.component.scss']
})
export class ButtonToggleExampleComponent {
    readonly isGridView = new FormControl(true);
    readonly condiments = new FormControl(['Mustard', 'Ketchup']);
}

