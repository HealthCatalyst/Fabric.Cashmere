import {Component} from '@angular/core';

/**
 * @title Radio button overview
 */
@Component({
    selector: 'radio-button-overview-example',
    templateUrl: 'radio-button-overview-example.html'
})
export class RadioButtonOverviewExample {
    favoriteShow: string | null = 'Silicon Valley';
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];

    reset(): void {
        this.favoriteShow = null;
    }
}
