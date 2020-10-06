import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styleUrls: ['./code-demo.component.scss']
})
export class CodeDemoComponent implements OnInit {
    public document: string = require('raw-loader!../../../../guides/styles/code.md');
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
