import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DocItem } from '../../core/document-items.service';
import { TabSetComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-component-viewer',
    templateUrl: 'component-viewer.component.html',
    styleUrls: ['component-viewer.component.scss'],
    standalone: false
})
export class ComponentViewerComponent implements AfterViewInit {
    private _docItem: DocItem | undefined;
    examplesHidden = false;
    apiHidden = false;
    usageHidden = false;

    @ViewChild('tabSet')
    tabSetRef: TabSetComponent;
    
    @Input()
    get docItem(): DocItem | undefined {
        return this._docItem;
    }
    set docItem(value: DocItem | undefined) {
        this._docItem = value;
        this.loadDocs();
    }

    private loadDocs() {
        if (this.docItem) {
            const examples = this.docItem.examples;
            this.examplesHidden = !(examples && examples.length > 0);
            this.apiHidden = this.docItem.hideApi ? this.docItem.hideApi : false;
            this.usageHidden = !this.docItem.usageDoc;
            this.selectFirstTab();
        }
    }

    ngAfterViewInit(): void {
        this.selectFirstTab();
    }

    selectFirstTab(): void {
        if ( this.tabSetRef ) {
            let selected = 0;
            if ( this.examplesHidden && !this.apiHidden ) {
                selected = 1;
            } else if ( this.examplesHidden && this.apiHidden ) {
                selected = 2;
            }

            setTimeout(() => {
                this.tabSetRef.selectTab( selected );
            });
        }
    }
}
