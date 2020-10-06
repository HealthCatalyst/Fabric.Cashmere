import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-logo',
    templateUrl: './logo-demo.component.html',
    styleUrls: ['./logo-demo.component.scss']
})
export class LogoDemoComponent implements AfterViewInit {
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
