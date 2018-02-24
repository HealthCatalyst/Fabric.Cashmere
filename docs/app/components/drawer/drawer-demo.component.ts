import { Component } from '@angular/core';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: './drawer-demo.component.html',
    styles: [ '[hc-button] { margin-top: 10px; margin-right: 10px;}' ]
})
export class DrawerDemoComponent {
    lastModified: Date = new Date( document.lastModified );
}
