import { Component } from '@angular/core';

@Component({
    selector: 'hc-tabs-demo',
    templateUrl: './tabs-demo.component.html',
    styleUrls: ['./tabs-demo.component.scss']
})
export class TabsDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    fullScreenCode: String = `.vertical-container { min-height: calc( 100vh - 53px ); }`;
}
