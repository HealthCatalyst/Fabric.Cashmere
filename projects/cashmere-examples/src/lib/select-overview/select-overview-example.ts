import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Select overview
 */
@Component({
    selector: 'select-overview-example',
    templateUrl: 'select-overview-example.html',
    styleUrls: ['select-overview-example.css']
})
export class SelectOverviewExample {
    private validCheck = false;

    selectControl = new FormControl('');

    toggleValidate() {
        this.validCheck = !this.validCheck;
        if (this.validCheck) {
            this.selectControl.setErrors({incorrect: true});
        } else {
            this.selectControl.setErrors({});
        }
    }
}
