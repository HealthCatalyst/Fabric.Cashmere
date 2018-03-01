import { Component, OnInit } from '@angular/core';
import { GuidesService } from './guides.service';

@Component({
    selector: 'hc-guides',
    templateUrl: './guides.component.html',
    styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit {
    constructor(public guidesService: GuidesService) { }

    ngOnInit() {
    }
}
