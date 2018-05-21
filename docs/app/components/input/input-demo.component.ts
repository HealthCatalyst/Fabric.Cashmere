import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormsModule, EmailValidator} from '@angular/forms';

@Component({
    selector: 'hc-input-demo',
    templateUrl: './input-demo.component.html',
    styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    submitted: boolean = false;
    public document: string = require('raw-loader!../../../../guides/components/input.md');

    onSubmit() {
        this.submitted = true;
    }
}
