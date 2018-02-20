import { Component } from '@angular/core';

@Component({
    templateUrl: './divider-demo.component.html',
    styleUrls: ['./divider-demo.component.scss']
})
export class DividerDemoComponent {
    lastModified: Date = new Date( document.lastModified );
}
