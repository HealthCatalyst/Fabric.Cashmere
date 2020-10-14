import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentViewerComponent } from '../component-viewer.component';

@Component({
    templateUrl: 'component-usage.component.html',
    styleUrls: ['component-usage.component.scss']
})
export class ComponentUsageComponent {
    private section: string;

    constructor(public componentViewer: ComponentViewerComponent, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['section']) {
                this.section = params['section'];
            }
        });
    }

    docLoaded() {
        if ( this.section ) {
            const el = document.getElementById(this.section);
            if ( el ) {
                el.scrollIntoView();
            }
        }
    }
}
