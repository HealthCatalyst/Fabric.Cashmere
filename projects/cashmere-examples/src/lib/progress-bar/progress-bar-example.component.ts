import {Component, OnInit, ViewChild} from '@angular/core';
import {ProgressBarComponent, ProgressItem, ProgressItemStatus} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-progress-bar-example',
    templateUrl: './progress-bar-example.component.html',
    styleUrls: ['./progress-bar-example.component.scss']
})
export class ProgressBarExampleComponent implements OnInit {
    @ViewChild('progressBarComponent') progressBarComponent: ProgressBarComponent;
    currentSelectedItem: ProgressItem;
    progressBarCompleted = false;
    progressItems: ProgressItem[] = [
        {id: 'company', title: 'Company', status: ProgressItemStatus.COMPLETE},
        {id: 'owners', title: 'Owners', status: ProgressItemStatus.INCOMPLETE},
        {id: 'general-info', title: 'General Info', status: ProgressItemStatus.INCOMPLETE, focused: true},
        {id: 'rating', title: 'Rating', status: ProgressItemStatus.INCOMPLETE},
        {id: 'losses', title: 'Losses', status: ProgressItemStatus.INCOMPLETE},
    ];
    allowSkipAhead: false;
    progressBarHeight: number = 35;
    breakPoint: string = '1024';
    showMobile: boolean;

    constructor() {
    }

    ngOnInit() {
        // this.selectProgressItem(this.progressItems[1]);
    }

    selectedProgressItem(item: ProgressItem) {
        this.currentSelectedItem = item;
    }

    completeCurrent() {
        this.progressBarComponent.completeCurrent();
    }
}