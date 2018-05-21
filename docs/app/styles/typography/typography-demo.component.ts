import {Component} from '@angular/core';

@Component({
    selector: 'hc-typography',
    templateUrl: './typography-demo.component.html',
    styleUrls: ['./typography-demo.component.scss']
})
export class TypographyDemoComponent {
    lastModified: Date = new Date(document.lastModified);
}
