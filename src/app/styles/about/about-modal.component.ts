import {Component} from '@angular/core';

@Component({
    selector: 'hc-about-modal',
    templateUrl: `./about-modal.component.html`,
    styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent {
    public document: string = require('raw-loader!../../../../guides/styles/about-modal.md');
}
