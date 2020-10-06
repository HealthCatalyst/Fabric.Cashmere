import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-icon-guide',
    templateUrl: './icon-guide.component.html',
    styleUrls: ['./icon-guide.component.scss']
})
export class IconGuideComponent implements AfterViewInit {
    private section: string | null;

    constructor(private router: Router) {}

    ngAfterViewInit() {
        this.section = this.extractUrlValue( 'section', this.router.url );
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
