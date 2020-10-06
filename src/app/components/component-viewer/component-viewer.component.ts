import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocItem } from '../../core/document-items.service';

@Component({
    selector: 'hc-component-viewer',
    templateUrl: 'component-viewer.component.html',
    styleUrls: ['component-viewer.component.scss']
})
export class ComponentViewerComponent {
    startSection = 0;
    private _docItem: DocItem | undefined;
    @Input()
    get docItem(): DocItem | undefined {
        return this._docItem;
    }
    set docItem(value: DocItem | undefined) {
        this._docItem = value;
        this.loadDocs();
    }
    sections: Set<string>;

    constructor(private router: Router) {}

    private loadDocs() {
        this.startSection = 0;
        let availableSections: string[] = [];

        if (this.docItem) {
            const examples = this.docItem.examples;
            const urlArray = this.router.url.split('/');
            if (examples && examples.length > 0) {
                availableSections = ['Examples'];
            }
            if (!this.docItem.hideApi) {
                availableSections.push('API');
                if ( urlArray[ urlArray.length - 1 ].substr(0, 3) === 'api' ) {
                    this.startSection = availableSections.length - 1;
                }
            }
            if (this.docItem.usageDoc) {
                availableSections.push('Usage');
                if ( urlArray[ urlArray.length - 1 ].substr(0, 5) === 'usage' ) {
                    this.startSection = availableSections.length - 1;
                }
            }

            this.sections = new Set<string>(availableSections);
        }
    }
}
