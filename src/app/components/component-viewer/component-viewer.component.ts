import {Component, OnInit} from '@angular/core';
import {DocItem, DocumentItemsService} from '../../core/document-items.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'component-viewer.component.html',
    styleUrls: ['component-viewer.component.scss']
})
export class ComponentViewerComponent implements OnInit {
    docItem: DocItem | undefined;
    sections: Set<string>;

    constructor(private activatedRoute: ActivatedRoute, private docItems: DocumentItemsService) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map(params => params['id']),
                map(id => this.docItems.getItemById(id))
            )
            .subscribe(docItem => {
                this.docItem = docItem;

                let availableSections = ['API'];

                if (this.docItem) {
                    const examples = this.docItem.examples;
                    if (examples && examples.length > 0) {
                        availableSections = ['Examples', 'API'];
                    }
                    if (this.docItem.usageDoc) {
                        availableSections.push('Usage');
                    }
                    this.sections = new Set<string>(availableSections);
                }
            });
    }
}
