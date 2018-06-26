import {Component} from '@angular/core';
import {ComponentViewerComponent} from '../component-viewer.component';

@Component({
    templateUrl: 'component-examples.component.html',
    styleUrls: ['component-examples.component.scss']
})
export class ComponentExamplesComponent {
    constructor(public componentViewer: ComponentViewerComponent) {}
}
