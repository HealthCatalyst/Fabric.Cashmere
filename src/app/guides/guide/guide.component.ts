import {Component, OnInit} from '@angular/core';
import {GuidesService, IGuide} from '../guides.service';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from 'src/app/shared/section.service';

@Component({
    selector: 'hc-guide',
    templateUrl: './guide.component.html',
    styles: [
        `
            td,
            th {
                vertical-align: middle;
            }
        `
    ],
    standalone: false
})
export class GuideComponent implements OnInit {
    public document = '';

    constructor(private activatedRoute: ActivatedRoute, public guidesService: GuidesService, private sectionService: SectionService) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(queryParams => {
            const route = queryParams.get('id');
            const selectedGuide: IGuide | undefined = this.guidesService.guides.find(guide => guide.route === route);
            if (selectedGuide) {
                this.document = selectedGuide.document;
            }
        });
    }

    loaded(): void {
        this.sectionService.scrollToSection();
    }
}
