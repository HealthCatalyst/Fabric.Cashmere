import {Component, OnInit, ViewChild} from '@angular/core';
import {ProgressBarComponent, ProgressItem} from '@wcf-insurance/cashmere';

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
        {id: 'company', title: 'Company', status: 'completed'},
        {id: 'owners', title: 'Owners', status: 'uncompleted'},
        {id: 'general-info', title: 'General Info', status: 'uncompleted'},
        {id: 'rating', title: 'Rating', status: 'uncompleted'},
        {id: 'losses', title: 'Losses', status: 'uncompleted'},
    ];
    allowSkipAhead: false;
    progressBarHeight: number = 55;

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
