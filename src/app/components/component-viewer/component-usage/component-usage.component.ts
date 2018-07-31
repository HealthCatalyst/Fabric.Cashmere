import {Component} from '@angular/core';
import {ComponentViewerComponent} from '../component-viewer.component';

@Component({
    templateUrl: 'component-usage.component.html',
    styleUrls: ['component-usage.component.scss']
})
export class ComponentUsageComponent {
    constructor(public componentViewer: ComponentViewerComponent) {}
}
