import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

/**
 * @title Select using Angular forms
 */
@Component({
    selector: 'hc-select-forms-example',
    templateUrl: 'select-forms-example.component.html',
    styleUrls: ['select-forms-example.component.scss']
})
export class SelectFormsExampleComponent {
    locations = [
        {id: 1, dbaName: 'Tax Commission'},
        {id: 2, dbaName: 'Insurance Department'},
        {id: 3, dbaName: 'Environmental Quality'},
    ];

    selectControl = new UntypedFormControl(this.locations[0]);

    setInsurance(): void {
        this.selectControl.setValue(this.locations[1], {onlySelf: true});
    }

    toggleActive(): void {
        if (this.selectControl.disabled) {
            this.selectControl.enable();
        } else {
            this.selectControl.disable();
        }
    }
}
