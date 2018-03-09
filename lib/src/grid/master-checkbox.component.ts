/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480
import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'th[hc-master-checkbox]',
    template: `<hc-checkbox
                    id="hc-master-checkbox"
                    (click)="masterCheckboxClick()"
                    [attr.checked]="masterChecked"
                    [indeterminate]="indeterminate">
                </hc-checkbox>`
})
export class MasterCheckboxComponent {
    @Output() masterCheckboxEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() public masterChecked: boolean = false;
    @Input() public indeterminate: boolean = false;

    masterCheckboxClick() {
        if (this.indeterminate) {
            this.indeterminate = false;
        } else {
            this.masterChecked = !this.masterChecked;
        }

        this.masterCheckboxEvent.emit(this.masterChecked);
    }

    setCheckedState() {
        this.masterChecked = true;
        this.indeterminate = false;
    }

    setIndeterminateState() {
        this.masterChecked = true;
        this.indeterminate = true;
    }

    setUncheckedState() {
        this.masterChecked = false;
        this.indeterminate = false;
    }
}
