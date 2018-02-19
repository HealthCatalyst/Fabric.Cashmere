import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hc-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {
    public doc = require('raw-loader!./index.md');

    constructor() { }

    ngOnInit() {
    }
}
