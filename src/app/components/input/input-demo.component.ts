import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'hc-input-demo',
    templateUrl: './input-demo.component.html',
    styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    document: string = require('raw-loader!../../../../guides/components/input.md');

    formDemo = new FormControl('', Validators.required);
}
