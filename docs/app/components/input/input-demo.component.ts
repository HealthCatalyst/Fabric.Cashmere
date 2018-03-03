import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';

@Component({
    selector: 'hc-input-demo',
    templateUrl: './input-demo.component.html',
    styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    validCheck: boolean = true;
    errorVal: Number = 0;
    emailText: string = '';

    onSubmit() {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if ( this.emailText.length === 0 ) {
            this.validCheck = false;
            this.errorVal = 1;
        } else if ( !EMAIL_REGEXP.test(this.emailText) ) {
            this.validCheck = false;
            this.errorVal = 2;
        } else {
            this.validCheck = true;
            this.errorVal = 0;
        }
    }
}
