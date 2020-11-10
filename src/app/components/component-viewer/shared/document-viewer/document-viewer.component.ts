/* tslint:disable:no-host-metadata-property */

import {Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'hc-doc-viewer',
    template: '',
    styleUrls: ['document-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.hc-doc-viewer]': 'true'
    }
})
export class DocumentViewerComponent {
    @Input()
    set documentUrl(docUrl: string) {
        this.fetchDocument(docUrl);
    }

    @Output()
    loaded: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient, private element: ElementRef) {}

    private fetchDocument(docUrl: string) {
        this.http.get(docUrl, {responseType: 'text'}).subscribe(doc => this.updateDocument(doc));
    }

    private updateDocument(docHtml: string): void {
        this.element.nativeElement.innerHTML = docHtml;
        this.loaded.emit( true );
    }
}
