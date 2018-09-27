import {Component} from '@angular/core';
import {ComponentViewerComponent} from '../component-viewer.component';

@Component({
    templateUrl: 'component-api.component.html'
})
export class ComponentApiComponent {
    constructor(public componentViewer: ComponentViewerComponent) {}
}
