import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-error-pages',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="guideLoaded()"></div></div>
    `
})
export class ErrorPagesComponent implements OnInit {
    public document: string = require('raw-loader!../../../../guides/styles/error.md');
    private section: string | null;

    constructor(private router: Router) {}

    ngOnInit() {
        this.section = this.extractUrlValue( 'section', this.router.url );
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
