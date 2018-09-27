import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Select using Angular forms
 */
@Component({
    selector: 'select-forms-example',
    templateUrl: 'select-forms-example.html',
    styleUrls: ['select-forms-example.css']
})
export class SelectFormsExample {
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
