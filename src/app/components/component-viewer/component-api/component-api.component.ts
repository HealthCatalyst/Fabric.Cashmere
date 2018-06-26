import {Component} from '@angular/core';
import {ComponentViewerComponent} from '../component-viewer.component';

@Component({
    templateUrl: 'component-api.component.html',
    styleUrls: ['component-api.component.scss']
})
export class ComponentApiComponent {
    constructor(public componentViewer: ComponentViewerComponent) {}
}
