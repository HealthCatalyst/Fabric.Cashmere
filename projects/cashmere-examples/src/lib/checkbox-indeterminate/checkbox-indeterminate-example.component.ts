import {Component} from '@angular/core';
import {CheckboxChangeEvent} from '@healthcatalyst/cashmere';

/**
 * @title Indeterminate Checkbox
 */
@Component({
    selector: 'hc-checkbox-indeterminate-example',
    templateUrl: 'checkbox-indeterminate-example.component.html',
    styleUrls: ['checkbox-indeterminate-example.component.scss']
})
export class CheckboxIndeterminateExampleComponent {
    childChecks = [true, false, true, false];

    isChecked() {
        return this.childChecks[0] && this.childChecks[1] && this.childChecks[2] && this.childChecks[3];
    }

    isIndeterminate() {
        let numChecked = 0;
        for (let i = 0; i < this.childChecks.length; i++) {
            if (this.childChecks[i]) {
                numChecked++;
            }
        }

        if (numChecked < 4 && numChecked > 0) {
            return true;
        } else {
            return false;
        }
    }

    childClick(event: CheckboxChangeEvent) {
        this.childChecks[parseInt(event.source.id, 10)] = event.checked;
    }

    parentClick() {
        if (!(this.childChecks[0] && this.childChecks[1] && this.childChecks[2] && this.childChecks[3])) {
            this.childChecks[0] = this.childChecks[1] = this.childChecks[2] = this.childChecks[3] = true;
        } else {
            this.childChecks[0] = this.childChecks[1] = this.childChecks[2] = this.childChecks[3] = false;
        }
    }
}
