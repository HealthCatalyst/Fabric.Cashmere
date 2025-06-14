import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RadioButtonChangeEvent} from '@healthcatalyst/cashmere';

/**
 * @title Select Component Placeholder
 */
@Component({
    selector: 'hc-select-placeholder-example',
    templateUrl: 'select-placeholder-example.component.html',
    styleUrls: ['select-placeholder-example.component.scss'],
    standalone: false
})
export class SelectPlaceholderExampleComponent implements OnInit {
    cities = [
        {
            name: 'Philadelphia'
        },
        {
            name: 'Atlanta'
        }
    ];

    phVal: string | null | undefined = undefined;
    selectVal = new FormControl();

    ngOnInit(): void {
        this.selectVal.setValue(undefined);
    }

    reset(value: string | null | undefined): void {
        this.selectVal.setValue(value);
    }

    updatePlaceholderVal(selected: RadioButtonChangeEvent): void {
        if (selected.value === '1') {
            this.phVal = '';
        } else if (selected.value === '2') {
            this.phVal = null;
        } else {
            this.phVal = undefined;
        }
    }
}
