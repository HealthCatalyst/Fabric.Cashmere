import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentViewerComponent } from '../component-viewer.component';

@Component({
    templateUrl: 'component-api.component.html'
})
export class ComponentApiComponent {
    private section: string;

    constructor(public componentViewer: ComponentViewerComponent, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['section']) {
                this.section = params['section'];
            }
        });
    }

    docLoaded(): void {
        if ( this.section ) {
            const el = document.getElementById(this.section);
            if ( el ) {
                el.scrollIntoView();
            }
        }
    }
}
