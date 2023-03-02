import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabChangeEvent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-selected-tab-input-example',
    templateUrl: 'selected-tab-input-example.component.html',
    styleUrls: ['selected-tab-input-example.component.scss']
})
export class SelectedTabInputExampleComponent {
    tabSelected = new FormControl(2);
    currentSelected = 2;

    selectionChanged(event: TabChangeEvent): void {
        this.tabSelected.setValue(event.index);
    }

    controlChanged(): void {
        this.currentSelected = Number(this.tabSelected.value);
    }
}
