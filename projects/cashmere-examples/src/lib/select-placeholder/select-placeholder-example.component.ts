import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RadioButtonChangeEvent } from '@healthcatalyst/cashmere';

/**
 * @title Select Component Placeholder
 */
@Component({
    selector: 'hc-select-placeholder-example',
    templateUrl: 'select-placeholder-example.component.html',
    styleUrls: ['select-placeholder-example.component.scss']
})
export class SelectPlaceholderExampleComponent {
    phVal: any = "";
    selectVal = new FormControl("");

    reset(): void {
        this.selectVal.setValue("");
    }

    updatePlaceholderVal( selected: RadioButtonChangeEvent ): void {
        if ( selected.value === "1" ) {
            this.phVal = "";
        } else if ( selected.value === "2" ) {
            this.phVal = null;
        } else {
            this.phVal = undefined;
        }
    }
}
