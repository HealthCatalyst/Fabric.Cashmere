import {Component, OnInit, Input} from '@angular/core';
import {GuidesService, IGuide} from '../guides.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'hc-guide',
    templateUrl: './guide.component.html',
    styles: [
        `
td,th {
    vertical-align:middle;
}
    `
    ]
})
export class GuideComponent implements OnInit {
    public document: string = '';

    constructor(private activatedRoute: ActivatedRoute, public guidesService: GuidesService) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(queryParams => {
            const route = queryParams.get('id');

            const selectedGuide: IGuide | undefined = this.guidesService.guides.find(guide => guide.route === route);
            if (selectedGuide) {
                this.document = selectedGuide.document;
            }
        });
    }
}
