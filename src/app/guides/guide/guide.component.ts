import {Component, OnInit} from '@angular/core';
import {GuidesService, IGuide} from '../guides.service';
import {ActivatedRoute, Router} from '@angular/router';

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
    ]
})
export class GuideComponent implements OnInit {
    public document: string = '';
    private section: string | null;

    constructor(private activatedRoute: ActivatedRoute, public guidesService: GuidesService, private router: Router) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(queryParams => {
            const route = queryParams.get('id');
            this.section = this.extractUrlValue( 'section', this.router.url );
            const selectedGuide: IGuide | undefined = this.guidesService.guides.find(guide => guide.route === route);
            if (selectedGuide) {
                this.document = selectedGuide.document;
            }
        });
    }

    guideLoaded() {
        if ( this.section ) {
            const el = document.getElementById(this.section);
            if ( el ) {
                el.scrollIntoView();
            }
        }
    }

    extractUrlValue(key, url) {
        const match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }
}
