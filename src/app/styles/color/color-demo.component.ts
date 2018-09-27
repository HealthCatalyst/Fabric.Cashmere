import {Component} from '@angular/core';

@Component({
    selector: 'hc-color-demo',
    templateUrl: './color-demo.component.html',
    styleUrls: ['./color-demo.component.scss']
})
export class ColorDemoComponent {
    lastModified: Date = new Date(document.lastModified);
}
