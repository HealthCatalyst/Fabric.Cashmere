import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'hc-tab-demo',
    template: `<div>Tab {{currentId}} Demo</div>`,
    styles: ['div{ padding: 15px; display: block; height: 198px; }']
})
export class TabDemoComponent implements OnInit {
    public currentId: number;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => (this.currentId = +params['id']));
    }
}
