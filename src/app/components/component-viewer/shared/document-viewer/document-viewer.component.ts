import {Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'hc-doc-viewer',
    template: '',
    styleUrls: ['document-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentViewerComponent {
    @HostBinding('class.hc-doc-viewer') _hostClass = true;

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
