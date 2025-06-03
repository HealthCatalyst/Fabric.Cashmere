import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Select using Angular forms
 */
@Component({
    selector: 'hc-select-forms-example',
    templateUrl: 'select-forms-example.component.html',
    styleUrls: ['select-forms-example.component.scss'],
    standalone: false
})
export class SelectFormsExampleComponent {
    locations = [
        {id: 1, dbaName: 'Tax Commission'},
        {id: 2, dbaName: 'Insurance Department'},
        {id: 3, dbaName: 'Environmental Quality'}
    ];

    selectControl = new FormControl(this.locations[0].id);

    setInsurance(): void {
        this.selectControl.setValue(this.locations[1].id, {onlySelf: true});
    }

    toggleActive(): void {
        if (this.selectControl.disabled) {
            this.selectControl.enable();
        } else {
            this.selectControl.disable();
        }
    }

    changeOptions(): void {
        this.locations = [
            {id: 1, dbaName: 'Tax Commission (updated)'},
            {id: 2, dbaName: 'Insurance Department (updated)'},
            {id: 3, dbaName: 'Environmental Quality (updated)'}
        ];
    }
}
