import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html'
})
export class TableDemoComponent implements AfterViewInit {
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
