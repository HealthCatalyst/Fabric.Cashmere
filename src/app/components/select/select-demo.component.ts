import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-select-demo',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.scss']
})
export class SelectDemoComponent {
    private validCheck = false;
    lastModified: Date = new Date(document.lastModified);

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
