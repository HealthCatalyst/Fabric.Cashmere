import { Component, ViewEncapsulation } from '@angular/core';
import { ActiveModal } from '@healthcatalyst/cashmere';

/** Download selector for product icons  */
@Component({
    selector: 'hc-icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class IconPickerComponent {
    productName: string;

    constructor(public activeModal: ActiveModal) {
        this.productName = activeModal.data;
    }
}
