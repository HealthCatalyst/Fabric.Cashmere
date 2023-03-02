import { Component, Input } from '@angular/core';
import { DocItem } from '../../core/document-items.service';

@Component({
    selector: 'hc-component-viewer',
    templateUrl: 'component-viewer.component.html',
    styleUrls: ['component-viewer.component.scss']
})
export class ComponentViewerComponent {
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

    private loadDocs() {
        let availableSections: string[] = [];

        if (this.docItem) {
            const examples = this.docItem.examples;
            if (examples && examples.length > 0) {
                availableSections = ['Examples'];
            }
            if (!this.docItem.hideApi) {
                availableSections.push('API');
            }
            if (this.docItem.usageDoc) {
                availableSections.push('Usage');
            }

            this.sections = new Set<string>(availableSections);
        }
    }
}
