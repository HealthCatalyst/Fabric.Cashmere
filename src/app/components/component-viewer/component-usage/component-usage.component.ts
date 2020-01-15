import {Component} from '@angular/core';
import {ComponentViewerComponent} from '../component-viewer.component';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'component-usage.component.html',
    styleUrls: ['component-usage.component.scss']
})
export class ComponentUsageComponent {
    constructor(public componentViewer: ComponentViewerComponent, public router: Router, public route: ActivatedRoute) {
        if (this.componentViewer.docItem && !this.componentViewer.docItem.usageDoc) {
            this.router.navigate(['..', 'examples'], {relativeTo: this.route, replaceUrl: true});
        }
    }
}
