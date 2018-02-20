import { Component } from '@angular/core';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: './drawer-demo.component.html'
})
export class DrawerDemoComponent {
    lastModified: Date = new Date( document.lastModified );
}
