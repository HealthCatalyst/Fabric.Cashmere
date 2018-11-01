import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Select using Angular forms
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'select-forms-example.component.html',
    styleUrls: ['select-forms-example.component.sass']
})
export class SelectFormsExampleComponent {
    selectControl = new FormControl('chicken');

    setTaters() {
        this.selectControl.setValue('taters');
    }

    toggleActive() {
        if (this.selectControl.disabled) {
            this.selectControl.enable();
        } else {
            this.selectControl.disable();
        }
    }
}
