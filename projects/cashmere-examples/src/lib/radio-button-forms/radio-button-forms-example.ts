import {Component} from '@angular/core';

/**
 * @title Inline Radio Buttons using Form Controls
 */
@Component({
    selector: 'hc-radio-button-forms-example',
    templateUrl: 'radio-button-forms-example.component.html'
})
export class RadioButtonFormsExampleComponent {
    favoriteShow: string | null = 'Silicon Valley';
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];

    reset(): void {
        this.favoriteShow = null;
    }
}
