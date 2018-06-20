import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: './drawer-demo.component.html',
    styleUrls: ['./drawer-demo.component.scss']
})
export class DrawerDemoComponent {
    lastModified: Date = new Date(document.lastModified);
}
