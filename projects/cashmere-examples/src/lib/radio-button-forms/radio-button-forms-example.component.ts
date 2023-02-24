import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Inline Radio Buttons using Form Controls
 */
@Component({
    selector: 'hc-radio-button-forms-example',
    templateUrl: 'radio-button-forms-example.component.html'
})
export class RadioButtonFormsExampleComponent {
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];
    readonly favoriteShowControl = new FormControl('Silicon Valley');

    reset(): void {
        this.favoriteShowControl.setValue(null);
    }
}
