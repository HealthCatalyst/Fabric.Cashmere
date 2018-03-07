import { Component } from '@angular/core';

@Component({
    selector: 'hc-chart-demo',
    templateUrl: './chart-demo.component.html'
})
export class ChartDemoComponent {

    lastModified: Date = new Date( document.lastModified );
}
