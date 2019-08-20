import {Component} from '@angular/core';

@Component({
    selector: 'hc-forms',
    templateUrl: `./forms.component.html`,
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
    public document: string = require('raw-loader!../../../../guides/styles/forms.md');
}
