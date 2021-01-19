import {Component, OnInit} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseContentComponent} from '../base-content.component';



@Component({
    selector: 'hc-usage',
    templateUrl: './usage.component.html',
    styleUrls: ['./usage.component.scss']
})
export class UsageComponent extends BaseContentComponent{
    

    constructor(sectionService: SectionService) {
        super(sectionService);
    }

   
}
