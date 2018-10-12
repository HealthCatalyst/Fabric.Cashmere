import {Component} from '@angular/core';

/**
 * @title Horizontal Radio Buttons using Form Controls
 */
@Component({
    selector: 'radio-button-forms-example',
    templateUrl: 'radio-button-forms-example.html',
    styleUrls: ['radio-button-forms-example.css']
})
export class RadioButtonFormsExample {
    favoriteShow: string | null = 'Silicon Valley';
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];

    reset(): void {
        this.favoriteShow = null;
    }
}
